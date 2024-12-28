import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart} = useCartStore();
    console.log(item)  ;

	return (
		<div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 w-1/4 md:order-1'>
					<img className='rounded object-cover' src={item?.image} alt="image" />
				</div>
				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-emerald-400'>{item?.price} dt</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
						{item?.product?.name}
					</p>
					<p className='text-sm text-gray-400'>{item?.description}</p>

					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline'
							onClick={async () => await removeFromCart(item._id)}
						>
							<Trash />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartItem;