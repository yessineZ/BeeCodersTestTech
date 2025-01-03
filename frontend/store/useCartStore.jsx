import {create} from 'zustand' ; 
import axios from 'axios' ; 
import toast from 'react-hot-toast';


export const useCartStore = create((set,get) => ({
    cart : [] , 
    coupon : null , 
    total : 0 , 
    subtotal : 0 , 
    isCouponApplied : false ,
    featuredProducts : [] ,
    

    getCartItems : async () => {
        try {
            const res = await axios.get('/api/cart/getCart') ; 
            get().calculateTotals() ;
            set({cart : res.data.cartItems}) ;
        }catch(err) {
            set({ cart : []}) ; 
            console.log(err.message) ;
        }
    },

   addToCart: async (product) => {
    try {
        const res = await axios.post('/api/cart', { productId: product._id });
        
        set((prevState) => {
            console.log(prevState) ; 
            const existingItem = prevState.cart.find((item) => item._id === product._id);
            let newCart = [] ; 
            if(!existingItem) {
                newCart = [...prevState.cart, { ...product }];
            }
            get().calculateTotals() ;

            return { cart: newCart };
        });

        toast.success('Product added to cart');
    } catch (err) {
        console.log(err.message);
    }
},

removeFromCart : async (productId) => {
    try {
        const res = await axios.delete('/api/cart',{
            data : { productId: productId }    
        });
        console.log(res) ; 
        set((prevState) => {
            return { cart: prevState.cart.filter((item) => item._id !== productId) };
        });
        get().calculateTotals() ; 

    }catch(err) {
        console.log(err.message) ;
    }
},


clearCart : async () => {
    set({ cart : [] , coupon : null , total : 0 , subtotal : 0}) ; 
},

 getMyCoupon : async () => {
    try {
        const response = await axios.get('/api/coupons') ;
        console.log(response) ;
        set({coupon : response.data }) ;
    }catch(err) {
        console.log(err.message) ;
    }
 },

 removeCoupon : async () => {
    set({ coupon : null , isCouponApplied : false }) ; 
    get().calculateTotals() ;
    toast.success('Coupon Applied successfully') ;   
 },


 applyCoupon : async (code) => {
    try {
        console.log('in applying coupon'+code) ;
        const response = await axios.post('/api/coupons/validate',{couponCode : code}) ;
        set({coupon :response.data , isCouponApplied : true }) ; 
        get().calculateTotals() ;

    }catch(err) {
        console.log(err.message) ;
    }
 },
    calculateTotals : () => {
        const { coupon , cart} = get() ; 
        const subtotal = cart.reduce((sum,item) => sum + item.price,0 ) ; 
        let total = subtotal ;
        console.log(total) ;  
        if(coupon) {
            total = total - (total * coupon.discount) / 100 ;
        }
        set({subtotal, total}) ;
    }

}));