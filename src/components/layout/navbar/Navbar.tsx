import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./navbar.module.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/public/img/logo.png" alt="Logo" />
      </div>
      <input
        type="checkbox"
        id="menuToggle"
        checked={menuOpen}
        onChange={toggleMenu}
        className={styles.checkbox}
      />
      <div className={styles.hamburgerLines} onClick={toggleMenu}>
        <span className={`${styles.line} ${menuOpen ? styles.line1 : ""}`}></span>
        <span className={`${styles.line} ${menuOpen ? styles.line2 : ""}`}></span>
        <span className={`${styles.line} ${menuOpen ? styles.line3 : ""}`}></span>
      </div>
      <nav className={`${styles.navbar} ${menuOpen ? styles.menuOpen : ""}`}>
        <ul className={styles.menuItems}>
          <li>
            <Link to="/" className={styles.navLink} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink} onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles.navLink} onClick={toggleMenu}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.navLink} onClick={toggleMenu}>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
