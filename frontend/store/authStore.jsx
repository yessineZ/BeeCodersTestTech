import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    user: null,

    getUser: async () => {
        try {
            const response = await axios.get('/api/auth/getMe',{
      withCredentials : true 
    });
            console.log(response) ; 

            const user = response.data?.user || null;
            if (user) {
                set({ user });
            }

            return user;

        } catch (err) {
            console.error('Error fetching user:', err.message);
            return null; 
        }
    },

       logout : async () => {
        try  {
            const res = await axios.get('/api/auth/logout') ; 
            console.log(res) ;
            window.location.reload() ; 
        }catch(e) {
            console.log(e) ;
        }
      }
}));
