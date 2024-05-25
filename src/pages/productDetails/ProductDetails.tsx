import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '@/tookit/slices/ProductSlice';
import { AppDispatch, RootState } from '@/tookit/store';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './productdetails.module.css';
import PagesTitle from '@/components/PagesTitle';
import { Product } from '@/types';
import { addtoCart } from '@/tookit/slices/CartSlice';

export const ProductDetails = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR);
  const dispatch: AppDispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addtoCart(product))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (slug) {
          await dispatch(fetchProductBySlug(slug));
        } else {
          console.error('Slug is undefined.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchData();
  }, [slug]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <article className={styles.productDetails}>
      <div className={styles.productDetails__title}>
        <PagesTitle title="Product Details" />
        <h2>Product Details</h2>
      </div>
      <div className={styles.productDetails__container}>
        <img src={product.image} alt={product.name} className={styles.productDetails__img} />
        <div className={styles.productDetails__body}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Sold: {product.soldQuantity}</p>
          <button
            className="btn-add-to-cart"
            onClick={() => {
              handleAddToCart(product)
            }}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>
    </article>
  )
};

