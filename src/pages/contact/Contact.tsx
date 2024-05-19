import PagesTitle from "@/components/PagesTitle"
import React from "react"
import styles from "./contact.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"

export const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <PagesTitle title="Contact Us" />
      <div className={styles.contactDetails}>
        <div className={styles.contactDetail}>
          <strong>
            <FontAwesomeIcon icon={faPhone} />
          </strong>{" "}
          +966 552123972
        </div>
        <div className={styles.contactDetail}>
          <strong>
            <FontAwesomeIcon icon={faEnvelope} />
          </strong>{" "}
          FitRoot360@hotmail.com
        </div>
      </div>
      <div className={styles.contactBox}>
        <div className={styles.contactContent}>
          <h1 className={styles.contactHeading}>Contact Us</h1>
          <p className={styles.contactDescription}>
            If you have any questions or need assistance, please contact us using the form below:
          </p>
          <form className={styles.contactForm}>
            <input type="text" placeholder="Your email" required className={styles.contactInput} />
            <textarea
              placeholder="Your message"
              required
              className={styles.contactTextarea}
            ></textarea>
            <button type="submit" className={styles.contactButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
