import { useEffect, useState } from 'react'
import './App.css'
import FloatingShape from './components/FloatingShape'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { Toaster, toast } from 'react-hot-toast'
import EmailVerification from './pages/EmailVerification'  ;
import axios from 'axios'
import { QueryClient, useQuery } from '@tanstack/react-query'
import Home from './pages/Home'
import DashboradPage from './pages/DashboradPage'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword' ; 
import { useQueryClient } from '@tanstack/react-query'
const fetchUser = async () => 
{
  try {
    const response = await axios.get('/api/auth/getMe',{
      withCredentials : true 
    });
    console.log(response.data.user) ;
    return response.data?.user || null  ;

  }catch(err) {
    console.log(err.message) ; 
    throw new Error("Failed to fetch user") ;
  }
}


function App() {
  const queryClient = useQueryClient() ; 
  const {data :authUser , isLoading , isError , error} = useQuery({
    queryKey: ['authUser'],
    queryFn: fetchUser,
    onError : (err) => toast.error(err.message) ,
    retry : false ,

  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-800 to-emerald-900 flex items-center justify-center relative overflow-hidden">
           <FloatingShape color="bg-green-500" size="w-64 h-64" top="5%" left="40%" delay={0} /> 
           <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="10%" delay={5} /> 
           <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} /> 
      <Toaster/>
      <Routes>
        
        <Route path="/signUp" element={authUser && authUser?.isVerfied ? <Navigate to='/home'></Navigate> : authUser && !authUser.isVerified ? <Navigate to='/EmailVerification'></Navigate> : <SignUpPage/> } />
        <Route path="/login" element={authUser && authUser?.isVerfied ? <Navigate to='/home'></Navigate> : authUser && !authUser.isVerfied ? <Navigate to='/EmailVerification'></Navigate> : <LoginPage/>} />
        <Route path="/EmailVerification" element={authUser ? <EmailVerification/> : <LoginPage/> } ></Route>
        <Route path='/home' element={authUser && authUser.isVerfied ? <Home/> :  authUser && !authUser.isVerfied ? <Navigate to='/EmailVerification'></Navigate> : <Navigate to='/login'></Navigate>  } />
        <Route path='/forget-password' element={<ForgetPassword/>} />
        <Route path='/reset-password/:link' element={<ResetPassword/> } ></Route>
        <Route path='/Dashboard' element={authUser && authUser.isVerfied ? <DashboradPage/> : authUser && !authUser.isVerfied  ?  <Navigate to='/EmailVerification'></Navigate> : <Navigate to='/login'></Navigate> }></Route>
      </Routes>
    </div>
    
  )}

export default App