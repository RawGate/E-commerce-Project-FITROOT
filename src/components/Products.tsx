import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/tookit/store';
import { fetchProducts } from '@/tookit/slices/ProductSlice';
import { useDispatch } from 'react-redux';
import '@/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
    const { products, isLoading, error } = useSelector((state: RootState) => state.productR); 
     console.log('Products:', products);
    

    const dispatch: AppDispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    useEffect(() => {
        const fetchData = async()=> {
            await dispatch(fetchProducts({pageNumber, pageSize}))
        }
        fetchData();
       
    }, [pageNumber])

    const handleNextPage = () => {
        setPageNumber(currentPage => currentPage + 1)

    }
    const handlePreviousPage = () => {
        setPageNumber(currentPage => currentPage - 1)

    }
     //console.log('Number of products:', products.length);
  return (
     <div className="product-list-container">
      <h2>Products</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <section className="products">
        {products && products.length > 0 && 
          products.map((product) => (
            <SingleProduct key={product.productId} product={product} />
          ))}
      </section>
      <div className='product-list-buttons'>
      <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button onClick={handleNextPage}><FontAwesomeIcon icon={faChevronRight} /></button>
    </div>
    </div>
  );
};

export default Products