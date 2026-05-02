// src/components/Footer.tsx
import React from 'react';
import styles from '@/styles/Footer.module.css';
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Bagian Atas */}
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <p>A Non-Profit Organization that rooted from the small movements of people who cares about environtment.
                Implementing science and technology in order to conserve biotic ecosystem within sea and the ocean.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>About</h4>
              <a href="#">Our Mission</a>
              <a href="#">Our Team</a>
              <a href="#">Impact</a>
            </div>

            <div className={styles.linkGroup}>
              <h4>Community</h4>
              <a href="#">Join Our Community</a>
              <a href="#">Events</a>
              <a href="#">Forum</a>
            </div>

            <div className={styles.linkGroup}>
              <h4>Contribute</h4>
              <a href="#">Donate</a>
              <a href="#">Volunteer</a>
              <a href="#">Partner With Us</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bagian Bawah */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © 2026 Oceanblu. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Discord"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;