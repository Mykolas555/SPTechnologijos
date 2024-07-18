import React, { useState } from 'react';
import { db, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Add = () => {
    const [img, setImg] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
        setError('');
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setError('');
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setError('');
    };

    const handleUpload = async () => {
        if (img === null || title === '' || description === '') {
            setError('Visi laukai yra privalomi.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const uniqueId = uuidv4();
            const imgRef = ref(storage, `files/${uniqueId}_${img.name}`);
            await uploadBytes(imgRef, img);
            const url = await getDownloadURL(imgRef);

            const newProduct = {
                id: uniqueId,
                title: title,
                description: description,
                imageUrl: url,
            };

            await addDoc(collection(db, 'products'), newProduct);
            setProducts(prevProducts => [...prevProducts, newProduct]);
            setTitle('');
            setDescription('');
            setImg(null);
            setSuccess('Produktas sėkmingai įkeltas!');
        } catch (error) {
            setError('Įvyko klaida įkeliant produktą. Bandykite dar kartą.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center m-5">
    <div className="border-4 border-red-500 rounded-lg shadow-lg p-4 w-full max-w-5xl">
        <form className="flex flex-col sm:flex-col md:flex-col lg:flex-row w-full items-center justify-between space-x-0 space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 w-full">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Produkto pavadinimas</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    disabled={loading}
                />
            </div>
            <div className="flex-1 w-full">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Produkto aprašymas</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    disabled={loading}
                />
            </div>
            <div className="flex-1 w-full">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pasirinkite failą</label>
                <input
                    type="file"
                    id="image"
                    onChange={handleImgChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    disabled={loading}
                />
            </div>
            <div className="flex-1 flex justify-center w-full">
                {loading ? (
                    <svg className="w-6 h-6 text-red-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <button
                        type="button"
                        onClick={handleUpload}
                        className="text-white w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Įkelti
                    </button>
                )}
            </div>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
    </div>
</div>

    );
}

export default Add;