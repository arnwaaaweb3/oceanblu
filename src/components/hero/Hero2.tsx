// /components/Hero2.tsx
'use client';

import React from 'react';
import styles from '@/styles/hero/Hero2.module.css';
import Gallery from '@/components/Gallery';

interface Hero2Props {
  title: string;
  subtitle?: string;
}

const Hero2: React.FC<Hero2Props> = ({ title, subtitle }) => {
  // Pisahin title menjadi "Welcome to " dan sisanya
  const welcomeText = "Welcome to ";
  // Ambil kata setelah "Welcome to " dari props title
  const highlightText = title.replace(welcomeText, "");

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {welcomeText}
          <span className={styles.highlight}>{highlightText}</span>
        </h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        {/* Gallery */}
          <section className="py-2">
            <Gallery speed={40} />
          </section>
      </div>
    </div>
  );
};

export default Hero2;