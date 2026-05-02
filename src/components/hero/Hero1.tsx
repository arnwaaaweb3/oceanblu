'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/hero/Hero1.module.css';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import DonateButton from '@/components/DonateButton';

const HERO_DATA = [
  {
    id: 1,
    title: "Restorating the  Ocean's  Ecosystem.",
    description: "At Oceanblue, we are focused on restoring the ocean's ecosystem through science and technolgy, starting from Indian Ocean.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070"
  },
  {
    id: 2,
    title: "Conserving Coral Reefs",
    description: "Coral reefs are playing crucial role in maintaning marine biodiversity, and  home to much fish species. Our scientist are working with the latest technology to restore the damaged coral reefs, using safe-environment materials.",
    img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2074"
  },
  {
    id: 3,
    title: "Breeding the Extinct Animals",
    description: "At Oceanblue, we are working to breed and conserve endangered marine species, ensuring their survival for future generations.",
    img: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?q=80&w=1974"
  }
];

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.carousel}>
        {HERO_DATA.map((item, index) => (
          <div key={item.id} className={styles.slide}>
            <Image 
              src={item.img} 
              alt={item.title}
              fill
              priority={index === 0}
              className={styles.imagePlaceholder}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
            <div className={styles.overlay}/>
            <div className={styles.content}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button className={styles.ctabutton}>
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Social Media Buttons */}
      <div className={styles.socialButtons}>
        <h3 className={styles.socialTitle}>See us more on:</h3>
        <div className={styles.socialIcons}>
          <a href="#" className={styles.socialIcon}>
            <FaInstagram aria-label= "Instagram" title="See us on Instagram"size={24} />
          </a>
          <a href="#" className={styles.socialIcon}>
            <FaTwitter aria-label= "Twitter/X" title="See us on X"size={24} />
          </a>
          <a href="#" className={styles.socialIcon}>
            <FaYoutube aria-label= "Youtube" title="See us on Youtube"size={24} />
          </a>
          <a href="#" className={styles.socialIcon}>
            <FaFacebook aria-label= "Facebook" title="See us on Facebook" size={24} />
          </a>
          <a href="#" className={styles.socialIcon}>
            <FaLinkedin aria-label= "LinkedIn" title="See us on LinkedIn"size={24} />
          </a>
        </div>
      </div>
      <DonateButton />
    </section>
  );
};

export default Hero;