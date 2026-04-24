// components/Header.tsx
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Header.module.css';
import HamburgerMenu from '@/components/HamburgerMenu';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image 
          src="/logotext.webp" 
          alt="Logo" 
          width={300} 
          height={300}
          priority  // ← biar logo cepat load
        />
      </div>

      {/* Menu */}
      <div className={styles.menuContainer}>
        <HamburgerMenu />
      </div>

    </header>
  );
};

export default Header;