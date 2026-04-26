'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Gallery.module.css';

interface GalleryItem {
  title: string;
  description: string;
  badge: string;
  image: string;
  priority?: boolean;
}

interface OceanGalleryProps {
  items?: GalleryItem[];
  speed?: number; // pixels per second
}

const defaultItems: GalleryItem[] = [
  {
    title: 'Coral Gardening',
    description: 'Replanting bleached reefs with fragments under the nurtured structure.',
    badge: 'Restoration',
    image: "/coral-reefs.webp",
    priority: true,
  },
  {
    title: 'Sea-Turtle Hatchery',
    description: 'Safeguarding nests and releasing hatchlings to boost endangered populations of Sea-Turtles.',
    badge: 'Conservation',
    image: '/sea-turtles.webp',
    priority: true,
  },
  {
    title: 'BioRock®',
    description: 'Implementing low-voltage electric currents to accelerate coral growth and resilience.',
    badge: 'Technology',
    image: '/biorock.webp',
    priority: true,
  },
  {
    title: 'Marine Protected Area (MPAs)',
    description: 'Protecting critical habitats from fishing and development to allow ecosystems to recover and thrive.',
    badge: 'Protection',
    image: '/marine.webp',
    priority: true,
  },
  {
    title: 'Beach Cleanup',
    description: 'Volunteers are working together to ensure our beaches are free of plastic and pollutions.',
    badge: 'Cleanup',
    image: '/beach-cleanup.webp',
    priority: true,
  },
  {
    title: 'Research and Science',
    description: 'Discovering new species deep in the ocean and understanding their role in the ecosystem.',
    badge: 'Research',
    image: '/research.webp',
    priority: true,
  },
  {
    title: 'Marine Biodiversity Mapping',
    description: 'Monitoring and mapping marine biodiversity hotspots to prioritize conservation efforts.',
    badge: 'Monitoring',
    image: '/biodiversity.webp',
    priority: true,
  },
  {
    title: 'Empowerment of Coastal Communities',
    description: 'Empowering local communities with sustainable livelihoods and education to become stewards of their marine environment.',
    badge: 'Social Impact',
    image: '/fisherman.webp',
    priority: true,
  },
];

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
  <div className={styles.card}>
    <div className={styles.cardImageWrapper}>
      <Image
        src={item.image}
        alt={item.title}
        fill
        quality={90}
        className={styles.cardImage}
        sizes="(max-width: 768px) 190px, 250px"
        style={{ objectFit: 'cover' }}
        priority={item.priority}
      />
    </div>
    <div className={styles.cardOverlay} />
    <span className={styles.badge}>{item.badge}</span>
    <div className={styles.cardCaption}>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.description}</p>
    </div>
  </div>
);

export default function OceanGallery({
  items = defaultItems,
  speed = 50,
}: OceanGalleryProps) {
  const [activeDot, setActiveDot] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const cardWidth = 270; // 250px card + 20px gap
  const oneSetWidth = items.length * cardWidth;
  const loopItems = [...items, ...items, ...items];

  // Seamless auto-scroll animation
  useEffect(() => {
    let frameId: number;
    const step = speed / 60;
    
    const animate = () => {
      if (!scrollRef.current || isPaused) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      
      const container = scrollRef.current;
      const currentScroll = container.scrollLeft;
      let newScroll = currentScroll + step;
      
      // Reset position seamlessly
      if (newScroll >= oneSetWidth * 2) {
        newScroll = newScroll - oneSetWidth;
        container.scrollLeft = newScroll;
      } else if (newScroll <= 0) {
        newScroll = newScroll + oneSetWidth;
        container.scrollLeft = newScroll;
      } else {
        container.scrollLeft = newScroll;
      }
      
      // Update active dot
      const dotIndex = Math.floor((container.scrollLeft % oneSetWidth) / cardWidth);
      if (dotIndex !== activeDot && dotIndex < items.length && dotIndex >= 0) {
        setActiveDot(dotIndex);
      }
      
      frameId = requestAnimationFrame(animate);
    };
    
    // Set initial position to middle set
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = oneSetWidth;
    }
    
    frameId = requestAnimationFrame(animate);
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [speed, isPaused, oneSetWidth, cardWidth, items.length, activeDot]);

  const handleDotClick = (index: number) => {
    setIsPaused(true);
    if (scrollRef.current) {
      const targetScroll = oneSetWidth + (index * cardWidth);
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveDot(index);
    }
    
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };
  
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  return (
    <section className={styles.gallery}>
      <div 
        className={styles.trackOuter}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={scrollRef} className={styles.track}>
          {loopItems.map((item, idx) => (
            <GalleryCard key={`${item.title}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Gallery navigation">
        {items.map((item, i) => (
          <button
            key={item.title}
            role="tab"
            aria-selected={activeDot === i}
            aria-label={item.title}
            className={`${styles.dot} ${activeDot === i ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </section>
  );
}