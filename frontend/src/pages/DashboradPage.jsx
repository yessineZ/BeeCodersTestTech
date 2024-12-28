import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../utils/Time';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const DashboardPage = () => {
    const queryClient = useQueryClient();
    const getUser = useAuthStore((state) => state.getUser);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, [getUser]);

    const logoutMutation = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.post('/api/auth/logout');
                if (response.data) {
                    useAuthStore.setState({ user: null });
                    await queryClient.invalidateQueries({ queryKey: ['authUser'] });
                    toast.success(response.data.message);
                    navigate('/login');
                }
                return response.data;
            } catch (err) {
                console.error(err.message);
                toast.error(err.response?.data?.message || 'Logout failed');
            }
        },
        onError: (error) => {
            toast.error('Failed to log out');
            console.error('Logout error:', error);
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
        >
            <h2 className='text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
                Dashboard
            </h2>

            <div className='mt-4'>
                <motion.div
                    className='p-4 bg-gray-800 bg-opacity-50 rounded-md border border-white-500'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className='text-xl font-bold text-green-400 mb-3'>Profile Information</h3>
                    <p className='text-white font-bold'>Name: {user?.username}</p>
                    <p className='text-white font-bold'>Email: {user?.email}</p>
                </motion.div>
            </div>

            <div className='mt-4'>
                <motion.div
                    className='p-4 bg-gray-800 bg-opacity-50 rounded-md border border-white-500'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className='text-xl font-bold text-green-400 mb-3'>Activities</h3>
                    <p className='text-white font-bold'>Joined: {formatDate(user?.createdAt)}</p>
                    <p className="text-white font-bold">Last Login: {user?.lastLogin ? formatDate(user?.lastLogin) : "You just signed up!"}</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='mt-4 flex flex-col gap-3'
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className='w-full py-3 px-4 bg-gradient-to-t from-red-500 to-red-700 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition'
                >
                    Logout
                </motion.button>
                <Link to={'/home'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='w-full py-3 px-4 bg-gradient-to-t from-emerald-500 to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:from-emerald-600 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition'
                    >
                        <span className='flex flex-row items-center justify-center gap-2'>
                            <FaArrowLeft /> Back To Home
                        </span>
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default DashboardPage ;
