import React from 'react';
import { Product } from '@/types';
import '@/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AppDispatch } from '@/tookit/store';
import { useDispatch } from 'react-redux';
import { addtoCart } from '@/tookit/slices/CartSlice';

const SingleProduct = (props: { product: Product }) => {
  const { product } = props;
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = (product: Product) =>{
    dispatch(addtoCart(product))

  }

  return (
    <div className="product">
      <img
        src={product.image} 
        alt={product.name}
        className='product__img'
      />
      <div className='product__body'>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <div className="product__actions">
          <Link to={`/products/${product.slug}`} className="btn-details">
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <button className="btn-add-to-cart" onClick={()=>{
            handleAddToCart(product)
          }}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

