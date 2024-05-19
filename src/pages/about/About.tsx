import React from "react"
import styles from "./about.module.css"

export const AboutUs = () => {
  return (
    <div className={`${styles.responsiveContainerBlock} ${styles.bigContainer}`}>
      <section className={styles.responsiveContainerBlock}>
        <div className={styles.textSide}>
          <h2 className={`${styles.textBlk} ${styles.heading}`}>Our Story</h2>
          <p className={`${styles.textBlk} ${styles.subHeading}`}>
            Born from a passion for a healthy lifestyle and the need for a single destination that
            caters to all fitness needs, FITROOT was established to help individuals discover their
            potential and achieve peak fitness. Whether you are a seasoned athlete or just starting
            out, we believe that everyone deserves access to high-quality fitness equipment and
            supplements. Our mission transcends beyond simply selling products; we aim to be your
            partner on the journey towards health and fitness. Founded on the principles of
            well-being, quality, and customer satisfaction, FITROOT is more than just a brand — it
            is a commitment to your health and fitness journey.
          </p>
        </div>
        <div className={styles.imgContainer}>
          <img src="/public/img/aboutus.png" alt="Our Story" className={styles.mainImg} />
        </div>
      </section>
      <section className={styles.responsiveContainerBlock}>
        <div className={styles.servicesContainer}>
          <h2 className={`${styles.textBlk} ${styles.heading}`}>Services Offered by FITROOT</h2>
          <div className={styles.service}>
            <div className={styles.cardImgContainer}>
              <img src="/public/img/gym.png" alt="Gym Equipment" className={styles.cardImg} />
            </div>
            <h3 className={`${styles.textBlk} ${styles.cardHeading}`}>Gym Equipment</h3>
            <p className={`${styles.textBlk} ${styles.cardSubHeading}`}>
              We offer a wide range of gym equipment suitable for both home and commercial use.
            </p>
          </div>
          <div className={styles.service}>
            <div className={styles.cardImgContainer}>
              <img src="/public/img/yoga.png" alt="Yoga Accessories" className={styles.cardImg} />
            </div>
            <h3 className={`${styles.textBlk} ${styles.cardHeading}`}>Yoga Accessories</h3>
            <p className={`${styles.textBlk} ${styles.cardSubHeading}`}>
              Embrace the art of yoga with our extensive collection of yoga mats, blocks, straps,
              and apparel.
            </p>
          </div>
          <div className={styles.service}>
            <div className={styles.cardImgContainer}>
              <img
                src="/public/img/supp.png"
                alt="Nutritional Supplements"
                className={styles.cardImg}
              />
            </div>
            <h3 className={`${styles.textBlk} ${styles.cardHeading}`}>Nutritional Supplements</h3>
            <p className={`${styles.textBlk} ${styles.cardSubHeading}`}>
              Our products are formulated to support your health and boost your performance.
            </p>
          </div>
          <div className={styles.service}>
            <div className={styles.cardImgContainer}>
              <img
                src="/public/img/service.png"
                alt="Personalized Service"
                className={styles.cardImg}
              />
            </div>
            <h3 className={`${styles.textBlk} ${styles.cardHeading}`}>Personalized Service</h3>
            <p className={`${styles.textBlk} ${styles.cardSubHeading}`}>
              Contact us for tailored advice on choosing the right equipment, accessories, and
              supplements to maximize your results.
            </p>
          </div>
          <div className={styles.service}>
            <div className={styles.cardImgContainer}>
              <img
                src="/public/img/after-sales.png"
                alt="After-Sales Support"
                className={styles.cardImg}
              />
            </div>
            <h3 className={`${styles.textBlk} ${styles.cardHeading}`}>After-Sales Support</h3>
            <p className={`${styles.textBlk} ${styles.cardSubHeading}`}>
              We provide comprehensive after-sales support, including easy returns, product
              warranties, and customer service that goes the extra mile.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
