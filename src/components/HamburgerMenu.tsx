// /components/HamburgerMenu.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Tambah FaTimes untuk icon close
import styles from '@/styles/HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll body saat menu terbuka (opsional tapi recommended)
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

  // Close menu saat tekan Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Tombol Hamburger */}
      <button
        className={styles.hamburgerBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={isOpen}
        type="button"
      >
        {isOpen ? (
          <FaTimes className={styles.hamburgerIcon} />
        ) : (
          <FaBars className={styles.hamburgerIcon} />
        )}
      </button>

      {/* Overlay (background gelap) */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Panel Menu - Slide dari kanan */}
      <aside 
        className={`${styles.menuPanel} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Konten kosong dulu, nanti bisa diisi */}
        <div className={styles.menuContent}>
          {/* 👈 Isi menu nanti di sini */}
        </div>
      </aside>
    </>
  );
};

export default HamburgerMenu;