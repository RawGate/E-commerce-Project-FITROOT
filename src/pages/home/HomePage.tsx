import PagesTitle from "@/components/PagesTitle"
import styles from "./home.module.css"
import Products from "@/components/Products"
import "@/index.css"

export const HomePage = () => {
  return (
    <main className={styles.container}>
      <PagesTitle title="Home" />
      <section className={styles.hero_container}>
        <div className={styles.hero_overlay}></div>
        <div className={styles.hero_content}>
          <h1>FITROOT</h1>
          <p className={styles.slogan}>Discover Health. Achieve Fitness.</p>
          <a href="#products" className={styles.heroButton}>
            Shop Now
          </a>
        </div>
      </section>
      <section className="product-container" id="products">
        <Products />
      </section>
    </main>
  )
}
