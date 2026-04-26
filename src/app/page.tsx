// src/app/page.tsx
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Hero1 from '@/components/Hero1'; 
import Hero2 from '@/components/Hero2';
import FunFactTooltip from '@/components/FunFactToolTip';
import styles from '@/styles/pages/HomePage.module.css';

export const metadata = {
  title: 'Home',
  description: 'Explore our latest projects in restoring marine life.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mt-25">
        
        {/* Container Hero 1 */}
        <section className="relative">
          <Hero1/>
          
          {/* Tooltip wrapper untuk Blue Whale */}
          <FunFactTooltip
            title="🐋 Blue Whale"
            fact="Blue whales are the largest animals ever known to have lived on Earth. Their heart alone weighs about 1,800 kg (4,000 lbs)! It's huge as a small car! Their tongue can weigh as much as an elephant."
            position="left"
            trigger="hover"
            className={styles.blueWhale}
          >
            <Image 
              src="/blue-whale.webp" 
              width={800} 
              height={800} 
              alt="Blue Whale"
              priority
            />
          </FunFactTooltip>
        </section>

        {/* Hero 2 */}
        <section className="relative">
          <Hero2 
            title="Welcome to Oceanblu"
            subtitle="Discover our latest projects in restoring marine life and protecting our oceans."
          />

          {/* Tooltip wrapper untuk Sea Turtle */}
          <FunFactTooltip
            title="🐢 Sea Turtle"
            fact="Sea turtles have been around for over 100 million years — since the time of dinosaurs! They can hold their breath for up to 5 hours underwater when resting or sleeping."
            position="right"
            trigger="hover"
            className={styles.turtle}
          >
            <Image 
              src="/turtle.webp" 
              width={700} 
              height={700} 
              alt="Turtle"
              priority
            />
          </FunFactTooltip>
        </section>
      </main>
    </>
  );
}