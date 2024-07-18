import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';

const EditProduct = ({ product, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: product.title,
        description: product.description,
        imageUrl: product.img,
    });
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setFormData({
            title: product.title,
            description: product.description,
            imageUrl: product.img,
        });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.title === '' || formData.description === '') {
            setError('Visi laukai yra privalomi.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let imageUrl = formData.imageUrl;

            if (img) {
                const uniqueId = product.id;
                const imgRef = ref(storage, `files/${uniqueId}_${img.name}`);
                await uploadBytes(imgRef, img);
                imageUrl = await getDownloadURL(imgRef);
            }

            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, {
                title: formData.title,
                description: formData.description,
                imageUrl,
            });

            onUpdate({ ...product, ...formData, img: imageUrl });
            onClose();
            setSuccess('Produktas sėkmingai atnaujintas!');
        } catch (error) {
            setError('Įvyko klaida atnaujinant produktą. Bandykite dar kartą.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center  w-full h-full">
                <div className="relative p-4 w-full max-w-md ">
                    <div className="relative bg-white border-4 border-red-500 rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Redaguoti produktą
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Uždaryti modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            {success && <div className="text-green-500 mb-4">{success}</div>}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pavadinimas</label>
                                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aprašymas</label>
                                    <textarea name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={formData.description} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pakeisti nuotrauką</label>
                                    <input type="file" name="image" id="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={handleImageChange} />
                                </div>
                                <div className="flex justify-between">
                                    <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={loading}>
                                        {loading ? 'Išsaugoma...' : 'Išsaugoti pakeitimus'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose}></div>
        </>
    );
    
};

export default EditProduct;
