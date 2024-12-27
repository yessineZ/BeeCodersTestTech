import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion' ; 
const Home = () => {
  return (
    <div className='font-bold text-primary p-6 rounded-sm flex flex-col'>
      Welcome Home 
      <Link to={'/Dashboard'}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{scale :0.9 }}
          className='my-2 w-full py-3 px-4 bg-gradient-to-t from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 '
          >DashBoard

          </motion.button>
      </Link>
    </div>
  )
}

export default Home
