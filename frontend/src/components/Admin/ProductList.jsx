import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../../../store/useProductStore";
import axios from "axios";
import toast from "react-hot-toast";

const ProductsList = () => {
    const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newImage,setNewImage] = useState("") ; 

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewImage(reader.result);
			};

			reader.readAsDataURL(file); // base64
		}
	};

    const closeEditModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
    };
    

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const response = await axios.post(`/api/products/${updatedProduct._id}`,updatedProduct);

             
            toast.success(response.data.message) ; 
        } catch (error) {
            console.error("Error updating product:", error);
        }
        closeEditModal();
    };

    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <table className='min-w-full divide-y divide-gray-700'>
                <thead className='bg-gray-700'>
                    <tr>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Product
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Price
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Featured
                        </th>
                        <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                    {products?.map((product) => (
                        <tr key={product._id} className='hover:bg-gray-700'>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                    <div className='flex-shrink-0 h-10 w-10'>
                                        <img
                                            className='h-10 w-10 rounded-full object-cover'
                                            src={product.image || "/tshirts.jpg"}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <div className='text-sm font-medium text-white'>
                                            {product.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-300'>
                                    ${product.price.toFixed(2)}
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <button
                                    onClick={() => toggleFeaturedProduct(product._id)}
                                    className={`p-1 rounded-full ${
                                        product.isFeatured
                                            ? "bg-yellow-400 text-gray-900"
                                            : "bg-gray-600 text-gray-300"
                                    } hover:bg-yellow-500 transition-colors duration-200`}
                                >
                                    <Star className='h-5 w-5' />
                                </button>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center mt-2'>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className='text-red-400 hover:text-red-300'
                                >
                                    <Trash className='h-5 w-5' />
                                </button>
                                <button
                                    onClick={() => openEditModal(product)}
                                    className='ml-4  text-blue-400 hover:text-blue-300'
                                >
                                    ✏️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-gray-800 rounded-lg p-6 w-96'>
                        <h2 className='text-lg font-bold text-white mb-4'>Edit Product</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const updatedProduct = {
                                    ...selectedProduct,
                                    name: e.target.name.value,
                                    price: e.target.price.value,
                                    image: newImage, 
                                };
                                handleUpdateProduct(updatedProduct);
                            }}
                        >
                            <div className='mb-4'>
                                <label className='block text-gray-300 mb-1'>Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    defaultValue={selectedProduct?.name}
                                    className='w-full px-3 py-2 rounded bg-gray-700 text-white'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-300 mb-1'>Price</label>
                                <input
                                    type='number'
                                    name='price'
                                    defaultValue={selectedProduct?.price}
                                    className='w-full px-3 py-2 rounded bg-gray-700 text-white'
                                    step='0.01'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-300 mb-1'>Image</label>
                                <input onChange={(e) => handleImageChange(e)}
                                    type='file'
                                    name='image'
                                    className='w-full px-3 py-2 rounded bg-gray-700 text-white'
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    onClick={closeEditModal}
                                    className='mr-2 bg-gray-600 px-4 py-2 rounded text-gray-300 hover:bg-gray-700'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ProductsList;
