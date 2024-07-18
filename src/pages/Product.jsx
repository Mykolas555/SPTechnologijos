import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: productId, ...docSnap.data() });
                } else {
                    console.log('Failed to get product!');
                }
            } catch (error) {
                console.error('Error fetching product: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div className='flex m-5 justify-center'>Produktas kraunamas...</div>;
    }

    if (!product) {
        return <div className='flex m-5 justify-center'>Produktas nerastas...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row border-4 m-5 border-red-500 p-4 rounded-lg shadow-lg">
            <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full md:w-56 h-56 object-contain"
            />
            <div className="flex flex-col justify-center md:ml-4 mt-4 md:mt-0">
                <h1 className="text-2xl font-semibold mb-2">
                    <span className="font-bold">Pavadinimas:</span> {product.title}
                </h1>
                <p className="text-gray-700 mb-4">
                    <span className="font-bold">Aprašymas:</span> {product.description}
                </p>
            </div>
        </div>
    );
};

export default Product;
