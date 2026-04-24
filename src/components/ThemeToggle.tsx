// /components/ThemeToggle.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from '@/styles/ThemeToggle.module.css';

const applyTheme = (t: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', t);
};

const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  const saved = localStorage.getItem('theme');
  if (saved === 'system' || !saved) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
};

const ThemeToggle = () => {
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved === 'light' || saved === 'dark') return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });


  const appliedRef = useRef(false);

  useEffect(() => {

    if (!appliedRef.current) {
      appliedRef.current = true;
      applyTheme(theme);
    }

    // Subscribe ke perubahan preferensi sistem (opsional)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      className={styles.toggleBtn}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${theme === 'light' ? 'Light' : 'Dark'} Mode?`}
      type="button"
      suppressHydrationWarning
    >
      {theme === 'light' ? (
        <FiSun className={styles.icon} />
      ) : (
        <FiMoon className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeToggle;