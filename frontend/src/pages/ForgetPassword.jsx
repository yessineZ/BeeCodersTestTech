import React from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion' ; 
import Input from '../components/Input';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import {  Mutation, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MdEmail } from "react-icons/md" ;


const ForgetPassword = () => {
    const [email, setEmail] = useState('') ;
    const [clicked,setClicked] = useState(false) ; 
    const {mutate , isError , error , isPending} = useMutation({
    mutationFn : async (email) => {
      try {
        const res = await axios.post('/api/auth/forget-password',{
          email
        });


         


        
        if(res.data) {
        console.log(res) ;
        toast.success(res.data.message) ;
     await queryClient.invalidateQueries({queryKey :  ['authUser']}) ; 

        }
      }catch(err) {
        console.log(err.message) ; 
        toast.error(res.data.message) ; 
      }
    }
  })
    const handleClick = () => {
        if(email) {
            mutate(email) ;
            setClicked(true) ;
        }else {
            toast.error('Provide a valid Email') ; 
        }

    

    }

  
    return (
        <motion.div
        initial={{ y : 20 , opacity : 0 }}
        animate={{y : 0 , opacity : 1}}
        transition={{ duration : 0.5 }}

        className='max-w-md gap-2  w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center'
        >
            <div className='p-4'>
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Forgot Password</h2>
            </div>

            {!clicked ? (
                <div className='flex flex-col items-center gap-4 '>
                    <span className="text-md text-center my-2">in case you forgot your password enter your email to get password reset</span>

        


                  
            <Input 
          placeholder="email"
          icon={MdOutlineMailOutline}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"

          />

          <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{scale :0.9 }}
          className='my-2 w-1/2 py-3 px-4 bg-gradient-to-t from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 '
         onClick={handleClick}
          >Submit
          </motion.button>
            </div>
        ) : (
            <div className='flex items-center justify-center gap-3 flex-col'>
                
                <span className='text-3xl text-white p-2 bg-success  rounded-full '><MdEmail/></span>
                <span className='text-center bg-gradient-to-r from-emerald-600 to-emerald-900 bg-clip-text mt-2 '>if {email} exist , you will find email that contains password reset url </span>
            </div>

        )}  
            <div className='w-full backdrop-blur-xl bg-gradient-to-r gap-2  rounded-b-xl  from-green-200 via-green-700 h-12 to-green-800 flex items-center justify-center    '>
                <Link to={'/login'}>
                <span className='text-black'><FaArrowAltCircleLeft/></span>
                </Link>
                
                
                <h2 className='font-bold text-center text-black my-2'> go back to login</h2>
            </div>
        </motion.div>
  )
}

export default ForgetPassword
