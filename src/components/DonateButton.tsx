// src/components/DonateButton.tsx
import React from 'react';
import styles from '@/styles/DonateButton.module.css';
import { FaHeart } from 'react-icons/fa'; // Import ikon hati

interface DonateButtonProps {
  text?: string;
  onClick?: () => void;
}

const DonateButton: React.FC<DonateButtonProps> = ({ 
  text = "Donate to Us", 
  onClick 
}) => {
  return (
    <button 
      className={styles.donateButton} 
      onClick={onClick}
    >
      <span>{text}</span>
      <FaHeart className={styles.icon} />
    </button>
  );
};

export default DonateButton;
