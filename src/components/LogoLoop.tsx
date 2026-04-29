'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import "@/styles/LogoLoop.css";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

export type NodeLogoItem = {
  node: React.ReactNode;
  href?: string;
  title?: string;
  ariaLabel?: string;
};

export type ImageLogoItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoItem = NodeLogoItem | ImageLogoItem;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─────────────────────────────────────────────
   Type guards
───────────────────────────────────────────── */

function isNodeItem(item: LogoItem): item is NodeLogoItem {
  return 'node' in item;
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

/* ─────────────────────────────────────────────
   Hooks
───────────────────────────────────────────── */

function useResizeObserver(
  callback: () => void,
  elements: Array<React.RefObject<Element | null>>,
  dependencies: React.DependencyList
): void {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((o) => o?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

function useImageLoader(
  seqRef: React.RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: React.DependencyList
): void {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remaining = images.length;

    const handleLoad = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener('load', handleLoad, { once: true });
        img.addEventListener('error', handleLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

function useAnimationLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
): void {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easing = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      if (seqSize > 0) {
        let next = offsetRef.current + velocityRef.current * deltaTime;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;

        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

const NodeItemContent: React.FC<{ item: NodeLogoItem }> = ({ item }) => (
  <span
    className="logoloop__node"
    aria-hidden={!!item.href && !item.ariaLabel}
  >
    {item.node}
  </span>
);

const ImageItemContent: React.FC<{ item: ImageLogoItem }> = ({ item }) => (
  <Image
    src={item.src}
    alt={item.alt ?? ''}
    title={item.title}
    width={item.width ?? 0}
    height={item.height ?? 0}
    sizes={item.sizes}
    draggable={false}
  />
);

const ItemWrapper: React.FC<{
  item: LogoItem;
  ariaLabel: string | undefined;
  children: React.ReactNode;
}> = ({ item, ariaLabel, children }) => {
  if (!item.href) return <>{children}</>;

  return (
    <a
      className="logoloop__link"
      href={item.href}
      aria-label={ariaLabel ?? 'logo link'}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const isVertical = direction === 'up' || direction === 'down';

    /* Effective hover speed */
    const effectiveHoverSpeed = useMemo<number | undefined>(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    /* Target velocity */
    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = isVertical
        ? direction === 'up'
          ? 1
          : -1
        : direction === 'left'
          ? 1
          : -1;
      return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
    }, [speed, direction, isVertical]);

    /* Dimensions */
    /* ─────────────────────────────────────────────
   Update Dimensions - FIXED VERSION
───────────────────────────────────────────── */

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const seqRect = seqRef.current?.getBoundingClientRect();
      const sw = seqRect?.width ?? 0;
      const sh = seqRect?.height ?? 0;

      if (isVertical) {
        const parentHeight =
          containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          containerRef.current.style.height = `${Math.ceil(parentHeight)}px`;
        }
        if (sh > 0) {
          setSeqHeight(Math.ceil(sh));
          const viewport =
            containerRef.current?.clientHeight ?? parentHeight ?? sh;
          // FIX: +3 bukan +2 biar lebih smooth
          setCopyCount(
            Math.max(MIN_COPIES, Math.ceil(viewport / sh) + 3)
          );
        }
      } else if (sw > 0) {
        setSeqWidth(Math.ceil(sw));
        // FIX: +3 bukan +2 biar lebih smooth
        setCopyCount(
          Math.max(
            MIN_COPIES,
            Math.ceil(containerWidth / sw) + 3
          )
        );
      }
    }, [isVertical]);

    useResizeObserver(
      updateDimensions,
      [containerRef, seqRef],
      [logos, gap, logoHeight, isVertical]
    );

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

    useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      seqHeight,
      isHovered,
      effectiveHoverSpeed,
      isVertical
    );

    /* CSS variables */
    const cssVariables = useMemo(
      () =>
        ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
        }) as React.CSSProperties,
      [gap, logoHeight, fadeOutColor]
    );

    /* Root class */
    const rootClassName = useMemo(
      () =>
        [
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          className,
        ]
          .filter(Boolean)
          .join(' '),
      [isVertical, fadeOut, scaleOnHover, className]
    );

    /* Container style */
    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: isVertical
          ? toCssLength(width) === '100%'
            ? undefined
            : toCssLength(width)
          : (toCssLength(width) ?? '100%'),
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style, isVertical]
    );

    /* Hover handlers */
    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);

    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    /* Item renderer */
    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          );
        }

        const itemAriaLabel = isNodeItem(item)
          ? (item.ariaLabel ?? item.title)
          : (item.alt ?? item.title);

        const content = isNodeItem(item) ? (
          <NodeItemContent item={item} />
        ) : (
          <ImageItemContent item={item} />
        );

        return (
          <li className="logoloop__item" key={key} role="listitem">
            <ItemWrapper item={item} ariaLabel={itemAriaLabel}>
              {content}
            </ItemWrapper>
          </li>
        );
      },
      [renderItem]
    );

    /* Logo lists (copies for infinite scroll) */
    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
            style={{
              // FIX: tambahin margin kiri cuma untuk copy pertama
              marginLeft: copyIndex === 0 ? 0 : undefined,
            }}
          >
            {logos.map((item, itemIndex) =>
              renderLogoItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    );

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        <div
          className="logoloop__track"
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;