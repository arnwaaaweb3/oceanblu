// src/components/WhaleToolTip.tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '@/styles/WhaleToolTip.module.css';

interface WhaleTooltipProps {
  title?: string | React.ReactNode;
  fact: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  trigger?: 'hover' | 'click';
  children: React.ReactNode;
  className?: string;
  offsetY?: number;
  offsetX?: number;
  icon?: React.ReactNode;
  verticalOffsetRatio?: number; // 🆕 prop baru: 0 = top, 0.5 = middle, 1 = bottom
}

export default function WhaleTooltip({
  title = '🐋 Did you know?',
  fact,
  position = 'left',
  trigger = 'hover',
  children,
  className = '',
  offsetY = 0,
  offsetX = 0,
  icon,
  verticalOffsetRatio = 0.5, // default 50% (tengah)
}: WhaleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Bungkus updatePosition dengan useCallback biar stabil
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = 0;
    let left = 0;

    // Hitung vertical position berdasarkan ratio
    const verticalCenter = triggerRect.top + scrollY + (triggerRect.height * verticalOffsetRatio);
    const tooltipVerticalCenter = tooltipRect.height / 2;

    switch (position) {
      case 'left':
        top = verticalCenter - tooltipVerticalCenter - offsetY;
        left = triggerRect.left + scrollX - tooltipRect.width - 15 - offsetX;
        break;
      case 'right':
        top = verticalCenter - tooltipVerticalCenter - offsetY;
        left = triggerRect.right + scrollX + 15 + offsetX;
        break;
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 15 - offsetY;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2 + offsetX;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 15 + offsetY;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2 + offsetX;
        break;
    }

    setTooltipPosition({ top, left });
  }, [position, offsetY, offsetX, verticalOffsetRatio]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') setIsVisible(false);
  };

  const handleClick = () => {
    if (trigger === 'click') setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`${styles.trigger} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[position]}`}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          <h4 className={styles.title}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {title}
          </h4>
          <p className={styles.fact}>{fact}</p>
        </div>
      )}
    </>
  );
}