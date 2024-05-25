import React, { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./navbar.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/tookit/store"
import { logoutUser } from "@/tookit/slices/UserSlice"
import { CartIcon } from "@/components/CartIcon"
import useCartState from "@/hooks/useCartState"
import useUserState from "@/hooks/useUserState"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn, userData } = useUserState()
  const { cartItems } = useCartState()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    toggleMenu()
  }

  return (
    <header className={styles.header}>
      <Link to="/cart" className={styles.cartIcon}>
        <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />
      </Link>
      <div className={styles.logo}>
        <img src="/public/img/logo.png" alt="Logo" />
      </div>
      <div className={styles.menuContainer}>
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
      </div>
      <nav className={`${styles.navbar} ${menuOpen ? styles.menuOpen : ""}`}>
        <ul className={styles.menuItems}>
          <li>
            <Link to="/" className={styles.navLink} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink} onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink} onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          {isLoggedIn && (
            <>
              {userData?.role === "admin" ? (
                <li>
                  <Link to="/dashboard/admin" className={styles.navLink} onClick={toggleMenu}>
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard/user" className={styles.navLink} onClick={toggleMenu}>
                    User Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link to="/" className={styles.navLink} onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
