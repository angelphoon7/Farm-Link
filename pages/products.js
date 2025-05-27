import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Products.module.css';

export default function Products() {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 3.99,
      image: 'https://bonnieplants.com/cdn/shop/articles/BONNIE_tomatoes_iStock-481349128-1800px_9f8f5390-a418-4d91-a3d0-00ae0b7900cb.jpg?v=1642541980&width=1800',
      farmer: 'Green Valley Farms',
      category: 'vegetables',
      description: 'Freshly harvested organic tomatoes'
    },
    {
      id: 2,
      name: 'Sweet Corn',
      price: 2.99,
      image: 'https://naturespath.com/cdn/shop/articles/growing_corn-948938.jpg?v=1725927714&width=2000',
      farmer: 'Sunny Fields Farm',
      category: 'vegetables',
      description: 'Sweet and juicy corn'
    },
    {
      id: 3,
      name: 'Fresh Lettuce',
      price: 1.99,
      image: 'https://www.marthastewart.com/thmb/mO0h3lFClXzoEZ_gxnHUGV43lLs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grow-lettuce-getty-5348e204ce4948808dc6e88c7d7b2379.jpg',
      farmer: 'Green Valley Farms',
      category: 'vegetables',
      description: 'Crisp and fresh lettuce'
    },
    {
      id: 4,
      name: 'Rice',
      price: 4.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FArXQuGECLU50-0bBjXg53jJKir-pAR2wQ&s',
      farmer: 'Apple Orchard',
      category: 'cereals',
      description: 'Cereal grain'
    },
    {
      id: 5,
      name: 'Banana',
      price: 5.99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZIBxh57PqFOfla_AmBUJYiVH22Q9r0ffuw&s',
      farmer: 'Berry Farm',
      category: 'fruits',
      description: 'Fresh and sweet bananas'
    },
  
  {
    id: 6,
    name: 'Papaya',
    price: 6.99,
    image: 'https://cdn.britannica.com/49/183449-050-1A2B4250/Papaya-tree.jpg',
    farmer: 'Papaya Paradise',
    category: 'fruits',
    description: 'Juicy and sweet papayas'
  }
];
  const filteredProducts = products
    .filter(product => filterBy === 'all' || product.category === filterBy)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });

  return (
    <div className={styles.container}>
      <Head>
        <title>Products - FarmLink</title>
        <meta name="description" content="Browse our selection of fresh produce" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Fresh Produce</h1>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
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
      </main>
    </div>
  );
} 