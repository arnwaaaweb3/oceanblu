'use client';

import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from '@/styles/ThemeToggle.module.css';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Satu-satunya tempat untuk akses client-side APIs
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = saved || systemTheme;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    setMounted(true);
    
    // Sinkronisasi atribut DOM tanpa memicu cascade re-render state
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Mencegah mismatch: Render placeholder transparan saat server-side
  if (!mounted) {
    return <div className={styles.toggleBtn} style={{ width: '40px', height: '40px', opacity: 0 }} />;
  }

  return (
    <button
      className={styles.toggleBtn}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${theme === 'light' ? 'Light' : 'Dark'} Mode`}
      type="button"
    >
      {theme === 'light' ? <FiSun className={styles.icon} /> : <FiMoon className={styles.icon} />}
    </button>
  );
};

export default ThemeToggle;