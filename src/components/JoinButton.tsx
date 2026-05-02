// src/components/JoinButton.tsx
import React from 'react';
import styles from '@/styles/JoinButton.module.css';
import { FaUsers } from 'react-icons/fa'; // Ikon komunitas

interface JoinButtonProps {
  text?: string;
  onClick?: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({ 
  text = "Join Our Community", 
  onClick 
}) => {
  return (
    <button 
      className={styles.joinButton} 
      onClick={onClick}
      title='Join Our Community ☻'
    >
      <span>{text}</span>
      <FaUsers className={styles.icon} />
    </button>
  );
};

export default JoinButton;