
import React from 'react'
import { useProductStore } from '../../store/useProductStore'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import ContactMe from '../components/ContactMe';
import { Link } from 'react-router-dom';
const Home = () => {
  const {  loading , products } = useProductStore() ;  
  const { getCartItems } = useCartStore() ; 
  console.log(products) ; 
  useEffect(() => {
    useProductStore.getState().fetchAllProducts();
    getCartItems() ;
  },[]) ;

    return (
		<div className='min-h-screen mt-16'>
      <section className="pink_container">
      <div className="heading flex flex-col justify-center items-center">
       <h1>Improve your skills on your own <br />
        To prepeare for a better future</h1>
        <Link to={"/signUp"} >
        <button className='flex justify-center rounded-3xl items-center px-6  text-white bg-pink-800 hover:bg-pink-900 transition-all font-bold text-[18px] rounded-lg;
 '>
          REGISTRE NOW
        </button>

        </Link> 
      </div>

    </section>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='flex justify-between items-center '>
          <motion.h1
					className='text-center text-[20px] sm:text-3xl font-bold text-black mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Discover Our Courses
				</motion.h1>

          <button className='flex justify-center rounded-3xl items-center px-6 py-2 text-white bg-pink-800 hover:bg-pink-900 transition-all font-bold text-[18px] rounded-lg;
 '>
          View More
        </button> 
        
        </div>
        

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No products found
						</h2>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>

      <ContactMe/>
		</div>
	);
}

export default Home ; 
