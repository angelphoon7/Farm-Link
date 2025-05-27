import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 3.99,
      image: 'https://bonnieplants.com/cdn/shop/articles/BONNIE_tomatoes_iStock-481349128-1800px_9f8f5390-a418-4d91-a3d0-00ae0b7900cb.jpg?v=1642541980&width=1800',
      farmer: 'Green Valley Farms',
      description: 'Freshly harvested organic tomatoes'
    },
    {
      id: 2,
      name: 'Sweet Corn',
      price: 2.99,
      image: 'https://naturespath.com/cdn/shop/articles/growing_corn-948938.jpg?v=1725927714&width=2000',
      farmer: 'Sunny Fields Farm',
      description: 'Sweet and juicy corn'
    },
    {
      id: 3,
      name: 'Fresh Lettuce',
      price: 1.99,
      image: 'https://www.marthastewart.com/thmb/mO0h3lFClXzoEZ_gxnHUGV43lLs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grow-lettuce-getty-5348e204ce4948808dc6e88c7d7b2379.jpg',
      farmer: 'Green Valley Farms',
      description: 'Crisp and fresh lettuce'
    }
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>FarmLink - Fresh from Farm to Table</title>
        <meta name="description" content="Order fresh produce directly from local farmers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Fresh from Farm to Your Table
          </h1>
          <p className={styles.description}>
            Connect directly with local farmers and get the freshest produce delivered to your doorstep
          </p>
          <Link href="/products" className={styles.ctaButton}>
            Shop Now
          </Link>
        </section>

        <section className={styles.featured}>
          <h2>Featured Products</h2>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className={styles.farmer}>By {product.farmer}</p>
                <p className={styles.price}>${product.price}</p>
                <p className={styles.description}>{product.description}</p>
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 FarmLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
