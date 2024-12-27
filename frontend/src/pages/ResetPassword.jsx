import {motion } from 'framer-motion'  ;
import Input from '../components/Input';
import { RiLockPasswordFill } from "react-icons/ri";
import { useMutation } from '@tanstack/react-query';
import React ,{useState  } from 'react' ; 
import { toast } from 'react-hot-toast';
import  axios  from 'axios';
import { useParams } from 'react-router-dom';
const ResetPassword = () => {
    const [form,setForm] = useState({
        password: "" , 
        confirmPassword: "" 
    });

    const {link} = useParams() ; 
    const {mutate , isError , isPending , error} = useMutation({
        mutationFn : async (form) => {
            try {
                const response = await axios.post(`api/auth/reset-password/${link}`,form) ; 
                if(response.data) {
                    toast.success(response.data.message) ; 
                }
                console.log(response) ; 
            } catch (error) {
                console.error(error) ;
            }
        }
    })

    const handleChange = (e) => {
        setForm({...form , [e.target.name] : e.target.value}) ; 
        console.log(form) ; 
    }

    const handleClick = () => {
        if(form.password!== form.confirmPassword ) {
            toast.error('Passwords do not match') ;
            return ;
        }else if(!form.confirmPassword || !form.confirmPassword) {
            toast.error('Please fill in both fields') ;
            return ;
        } 
        mutate(form.password) ;
    }
    return (
    <motion.div
    initial={{y : 20 , opacity : 0}}
    animate={{y : 0 , opacity : 1}}
    transition={{duration : 0.5}}
    className='max-w-md flex flex-col items-center justify-center  w-full backdrop-blur backdrop-filter max-w-xl bg-gradient-to-r from-emerald-500 to-emerald-950 rounded-2xl '
    >
        <div className="mt-2">
           <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Reset Password</h2>
        </div>

        <div className='flex flex-col'>
            <Input placeholder="enter the new password"
            type="password"
            name="password"
            onChange={handleChange}
            icon={RiLockPasswordFill}
            

            />

            <Input placeholder="confirm password"
            type="password"
            name="confirmPassword"
            icon={RiLockPasswordFill}
            onChange={handleChange}

            />




        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{scale :0.9 }}
          className='my-2 w-1/2 py-3 px-4 bg-gradient-to-t from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 '
        onClick={handleClick}
          >Submit

          </motion.button>
            



    </motion.div>
  )
}

export default ResetPassword
