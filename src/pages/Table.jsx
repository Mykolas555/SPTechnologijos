import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Add from '../pages/Add';
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct'; 

const Table = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleAdd = () => {
        setShowAdd(!showAdd);
    };

    const toggleEdit = (productId) => {
        setEditProductId(productId);
        setShowEdit(!showEdit);
    };

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                productsList.push({
                    id: doc.id,
                    FID: data.id,
                    title: data.title,
                    description: data.description,
                    img: data.imageUrl,
                });
            });
            setProducts(productsList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Ar tikrai norite ištrinti šį produktą?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'products', id));
                setProducts(products.filter((product) => product.id !== id));
            } catch (error) {
                console.error("Error deleting product: ", error);
            }
        }
    };

    const handleUpdate = (updatedProduct) => {
        setProducts(products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    };

    if (loading) {
        return <div className='flex justify-center m-5'>Gaunami produktai...</div>;
    }

    return (
        <>
            <div className='flex justify-center items-center m-5'>
                <button
                    onClick={toggleAdd}
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {showAdd ? "Paslėpti pridėjimą" : "Pridėti produktą"}
                </button>
            </div>
            {showAdd && <Add />}

            {showEdit && (
                <EditProduct
                    product={products.find((product) => product.id === editProductId)}
                    onClose={() => setShowEdit(false)}
                    onUpdate={handleUpdate}
                />
            )}

            <div className="flex m-auto items-center overflow-x-auto shadow-md sm:rounded-lg">
                <table className="text-sm m-5 w-full text-left rtl:text-right text-gray-500 dark:text-gray-400 border-4 border-red-500 rounded-lg bg-transparent">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Pavadinimas</th>
                            <th scope="col" className="px-6 py-3">Aprašymas</th>
                            <th scope="col" className="px-6 py-3">Nuotrauka</th>
                            <th scope="col" className="px-6 py-3">Redaguoti</th>
                            <th scope="col" className="px-6 py-3">Ištrinti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-3">
                                    <Link to={`/product/${product.id}`} className="text-black-500 hover:underline hover:text-red-500">
                                        {product.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-3">
                                    {product.description.length > 40 ? `${product.description.substring(0, 40)}...` : product.description}
                                </td>
                                <td className="px-6 py-3">
                                    <img src={product.img} alt={product.name} className="w-24 h-24 object-cover" />
                                </td>
                                <td className="px-6 py-3">
                                    <button
                                        type="button"
                                        onClick={() => toggleEdit(product.id)}
                                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Redaguoti
                                    </button>
                                </td>
                                <td className="px-6 py-3">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(product.id)}
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Ištrinti
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
