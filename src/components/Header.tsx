'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Header.module.css';
import HamburgerMenu from '@/components/HamburgerMenu';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Cek theme dari HTML attribute
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    checkTheme();

    // Observer buat ngeliat perubahan theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Pilih logo berdasarkan theme
  const logoSrc = theme === 'dark' ? '/logotext.webp':'/logotext.svg';

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src={logoSrc}
          alt="Logo"
          width={300}
          height={300}
          priority
          draggable={false}
        />
      </div>

      {/* Menu */}
      <div className={styles.menuContainer}>
        <ThemeToggle />
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;