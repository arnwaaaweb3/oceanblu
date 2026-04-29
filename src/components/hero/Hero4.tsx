'use client';

import React from 'react';
import styles from '@/styles/hero/Hero4.module.css';
import Image from 'next/image';
import LogoLoop, { ImageLogoItem } from '@/components/LogoLoop';

const logos: ImageLogoItem[] = [
  {
    src: '/icons/amsa.webp',
    alt: 'AMSA Logo',
    href: 'https://www.amsa.gov.au/',
    title: 'AMSA',
    width: 200,
    height: 80,
  },
  {
    src: '/icons/iucn.svg',
    alt: 'IUCN Logo',
    href: 'https://iucn.org',
    title: 'IUCN',
    width: 80,
    height: 80,
  },
  {
    src: '/icons/imo.webp',
    alt: 'IMO Logo',
    href: 'https://www.imo.org/en',
    title: 'IMO',
    width: 180,
    height: 80,
  },
  {
  src: '/icons/unimelbourne.webp',
    alt: 'University of Melbourne Logo',
    href: 'https://www.unimelb.edu.au',
    title: 'University of Melbourne',
    width: 180,
    height: 80,
  },
  {
  src: '/icons/uwa.webp',
    alt: 'University of Western Australia Logo',
    href: 'https://www.uwa.edu.au/home',
    title: 'University of Western Australia',
    width: 180,
    height: 80,
  },
  {
  src: '/icons/kkp.svg',
    alt: 'Ministry of Marine Affairs and Fisheries Indonesia Logo',
    href: 'https://kkp.go.id/',
    title: 'Ministry of Marine Affairs and Fisheries Indonesia',
    width: 180,
    height: 80,
  },
  {
  src: '/icons/sea.webp',
    alt: 'The SEA People Logo',
    href: 'https://theseapeople.org/',
    title: 'The SEA People',
    width: 180,
    height: 80,
  },
  {
  src: '/icons/saveocean.webp',
    alt: 'Save Ocean Logo',
    href: 'https://www.saveocean.co/',
    title: 'Save Ocean',
    width: 180,
    height: 80,
  },
  {
  src: '/icons/reef.webp',
    alt: 'REEFolution Logo',
    href: 'http://reefolution.org/',
    title: 'REEFolution',
    width: 180,
    height: 80,
  },
];

export default function Hero4() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          WE&apos;RE PROUDLY ANNOUNCE OUR PARTNERSHIP WITH:
        </h1>

        <div className={styles.logoLoopWrapper}>
          <LogoLoop
            logos={logos}
            speed={80}
            direction="left"
            logoHeight={80}
            gap={0}  // ← atau 8 atau 16, terserah kamu!
            pauseOnHover={true}
            hoverSpeed={20}
            fadeOut={true}
            fadeOutColor="transparent"
            scaleOnHover={true}
            className={styles.logoLoop}
            renderItem={(item, key) => {
              const logo = item as ImageLogoItem;
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'auto',
                    height: '80px',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt || ''}
                    title={logo.title}
                    width={logo.width}
                    height={logo.height}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                    draggable={false}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}