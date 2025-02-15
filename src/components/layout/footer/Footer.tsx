import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import styles from "./footer.module.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
           {/*  <li>Privacy Policy</li>
            <li>Terms of Service</li> */}
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <h3>Follow Us</h3>
          <a href="https://twitter.com/FitRoot360">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://www.instagram.com/fitroot360/?hl=en">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className={styles.newsletter}>
          <h3>Newsletter</h3>
          <p>Subscribe for personalized wellness tips and exclusive content:</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
      <div className={styles.copyRight}>
        <p>© {new Date().getFullYear()} FITROOT. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
