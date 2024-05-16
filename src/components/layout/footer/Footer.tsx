import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <a href="https://twitter.com/FitRoot360"><FontAwesomeIcon icon={faXTwitter}/></a>
          <a href="https://www.instagram.com/fitroot360/?hl=en"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
        <div className={styles.newsletter}>
          <h3>Newsletter</h3>
          <p>Subscribe for personalized wellness tips and exclusive content:</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
          </form>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>© {new Date().getFullYear()} FITROOT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;