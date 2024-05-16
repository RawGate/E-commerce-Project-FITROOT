import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css'; 

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/public/img/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
