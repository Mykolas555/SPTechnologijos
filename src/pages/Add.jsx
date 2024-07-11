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

    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleUpload = () => {
        if (img !== null && title !== '' && description !== '') {
            setLoading(true);
            const uniqueId = uuidv4();
            const imgRef = ref(storage, `files/${uniqueId}_${img.name}`);
            uploadBytes(imgRef, img).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    const newProduct = {
                        id: uniqueId,
                        title: title,
                        description: description,
                        imageUrl: url
                    };
                    addDoc(collection(db, 'products'), newProduct).then(() => {
                        setProducts(prevProducts => [...prevProducts, newProduct]);
                        setTitle('');
                        setDescription('');
                        setImg(null);
                        setLoading(false);
                    });
                });
            });
        }
    }

    return (
        <div className="flex justify-center m-5">
            <div className="max-w-sm p-4 border-4 border-red-500 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-red-500">
                <form className="space-y-6">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Pridėti naują produktą</h5>
                    <div>
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
                    <div>
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
                    <div>
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
                    {loading ? (
                        <div className="flex justify-center">
                            <svg className="w-6 h-6 text-red-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : (
                        <button 
                            type="button" 
                            onClick={handleUpload} 
                            className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Įkelti
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Add;
