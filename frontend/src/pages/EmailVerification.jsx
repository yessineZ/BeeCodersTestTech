import React, { useRef, useState ,useEffect} from 'react'
import {motion} from 'framer-motion' ; 
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
const EmailVerification = () => {
  const [code,setCode] = useState(['','','','','','']) ; 
  const inputRefs = useRef([]) ;
  const btn = useRef() ; 
  const queryClient = useQueryClient() ; 
  


  const {mutate , isError , error , isPending} = useMutation({
    mutationFn : async (code) => {
      try {
        const res = await axios.post('/api/auth/verify-code',{
          code 
        });
        if(res.data) {
        console.log(res) ;
        toast.success(res.data.message) ;
       await  queryClient.invalidateQueries({queryKey :  ['authUser']}) ; 

        }
      }catch(err) {
        console.log(err.message) ; 
        toast.error(res.data.message) ; 
      }
    }
  })
  const handleChange = (index,value) => {
    
    const newCode = [...code] ;
    if(value.length === 1 ) {
      console.log(value) ; 
      
      newCode[index] = value ; 
      setCode(newCode) ; 
      
      if(index < 5) {
        inputRefs.current[index+1].focus() ;  
      }

      console.log(code) ; 

    }

    if(value.length > 1) {
    console.log(value.length) ;
      const filter = value.slice(0,value.length).split('')  ;
      console.log(filter) ; 
      for(let i = 0 ; i < filter.length  ; i++ ){
        newCode[i] = filter[i] || '' ; 
      } 
      console.log(newCode) ; 
      setCode(newCode) ;

      filter.forEach((e,i) => {
        inputRefs.current[i].value = e
        inputRefs.current[i+1].focus() ;
      })


    }


    
  }
  



  const handleKeyDown = (index,e) => {
    if(e.key ==='Backspace' && index > 0) {
      const newCode = [...code] ;
      newCode[index] = '' ;
      setCode(newCode) ;
      inputRefs.current[index].value = '' ; 
      inputRefs.current[index-1].focus() ;
    }
   
  }

  const handleSubmit = (e) => {
    e.preventDefault() ; 
    const verifyCode = code.join('') ;
    mutate(verifyCode) ;

    


  }

  useEffect(() => {
    setTimeout(() => {
    const verifyCode = code.join('') ; 
    if(verifyCode.length === 6) {
      btn.current.click() ;
    }
  },1000) 
},[code]) ; 

    
  return (
    <motion.div 
    initial={
      {
      opacity: 0,
      y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
    
    className="max-w-md  w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center" >

     <div className='mt-2'>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Verification Code</h2>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <span className="text-sm">Enter the verification code sent to your email:</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
      {code.map((ele,index) => (
        <input 
        type="text" 
        className="border-2  border-gray-300 p-2 rounded-lg w-10 mr-2 focus:border-green-500 focus:outline-none ml-2 size-12
         text-center font-bold bg-gray-700 text-white  " 
        key={index}
        ref={(ele) => (inputRefs.current[index] = ele)} 
        onChange={(e) => handleChange(index,e.target.value)}
        onKeyDown={(e) => handleKeyDown(index,e)} />
        
      ))}
        </div>

        <div className='m-6'>
        <motion.button className='w-full py-3 px-4 bg-gradient-to-t from-green-500 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200'
             whileTap={{scale : 0.98}}
             whileHover={{scale :1.02}}
             type='submit'
             ref={btn}>Submit    
        </motion.button>
        </div>


      </form>
       
    </motion.div>
  )
}


export default EmailVerification
