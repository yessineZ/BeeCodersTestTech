import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useAuthStore();
	const {addToCart} = useCartStore() ; 
	const handleAddToCart = () => {
        if (!user) {
            toast.error("Please log in to add items to your cart");
            return;
        }else {
			addToCart(product) ;  
        }
	}; 

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg  border-pink-700 border-[2px] shadow-lg'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
				<div className='absolute inset-0 bg-black bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-black'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-pink-800'>{product.price}dt</span>
					</p>
				</div>
				<button
					className='flex items-center justify-center rounded-lg bg-pink-800 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-pink-900 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all transition-duration-1000'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard ;