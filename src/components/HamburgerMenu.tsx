'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaFish,
  FaWater,
  FaLeaf,
  FaNewspaper,
  FaHandsHelping,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaHeart,
  FaShieldAlt,
} from 'react-icons/fa';
import Link from 'next/link';
import styles from '@/styles/HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu dengan tombol Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Menu items untuk Ocean Conservation
  const menuItems = [
    { href: '/', label: 'Home', icon: <FaHome /> },
    { href: '/about', label: 'Our Mission', icon: <FaHeart /> },
    { href: '/projects', label: 'Projects', icon: <FaWater /> },
    { href: '/marine', label: 'Life at Sea', icon: <FaFish /> },
    { href: '/sustainability', label: 'SDGs', icon: <FaLeaf /> },
    { href: '/volunteer-application', label: 'Become a Volunteer', icon: <FaHandsHelping /> },
    { href: '/news', label: 'Latest News', icon: <FaNewspaper /> },
    { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  const socialLinks = [
    { href: 'https://github.com', icon: <FaGithub />, label: 'GitHub' },
    { href: 'https://linkedin.com', icon: <FaLinkedin />, label: 'LinkedIn' },
    { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
    { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter' },
  ];

  const stats = [
    { value: '12+', label: 'Active Projects' },
    { value: '50K+', label: 'Supporters' },
    { value: '8', label: 'Countries' },
  ];

  return (
    <>
      {/* Tombol Hamburger */}
      <button
        className={styles.hamburgerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        title="Menu"
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? (
          <FaTimes className={styles.hamburgerIcon} />
        ) : (
          <FaBars className={styles.hamburgerIcon} />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <aside 
        className={`${styles.menuPanel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu - Oceanblu"
      >
        <div className={styles.menuContent}>
          {/* Header dengan wave decoration */}
          <div className={styles.menuHeader}>
            <div>
              <h2 className={styles.menuTitle}>Oceanblu</h2>
              <p className={styles.menuSubtitle}>Sea & Ocean Conservation</p>
            </div>
            <button 
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={styles.navLink}
                    onClick={closeMenu}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.divider} />

          {/* Statistic Section */}
          <div className={styles.statsSection}>
            <p className={styles.sectionTitle}>Our Impact So Far</p>
            <div className={styles.statsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Social Links */}
          <div className={styles.socialSection}>
            <p className={styles.sectionTitle}>Follow Our Journey</p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  onClick={closeMenu}
                  aria-label={social.label}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className={styles.ctaSection}>
            <button className={styles.ctaButton} aria-label="Support US">
              <FaShieldAlt />
              <span>Support Us</span>
            </button>
          </div>

          {/* Footer */}
          <div className={styles.menuFooter}>
            <p>This website built with the power of love from the community.</p>
            <p className={styles.copyright}>© 2026 Oceanblu</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default HamburgerMenu;