import React, { useState } from 'react';

const Contacts = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Message sent: ${message}`);
        alert(`Message sent: ${message}`);
        setMessage('');
    }

    return (
        <div className='contacts flex flex-col items-center m-10'>
            <h2 className='text-1xl text-gray-900 font-extralight dark:text-white text-justify font-bold'>
                Kontaktinė informacija:
            </h2>
            <br />
            <p className='text-1xl text-gray-900 font-extralight dark:text-white  font-bold'>
                Adresas: T. Masiulio g. 18b, LT-3014 Kaunas, Lithuania
            </p>
            <p className='text-1xl text-gray-900 font-extralight dark:text-white  font-bold'>
                Telefono nr: +370 37 407 277
            </p>
            <p className='text-1xl text-gray-900 font-extralight dark:text-white text-justify font-bold'>
                Fakso nr.: +370 37 407 278
            </p>
            <p className='text-1xl text-gray-900 font-extralight dark:text-white text-justify font-bold'>
                Mobilaus telefono nr: +370 687 97 000
            </p>
            <p className='text-1xl text-gray-900 font-extralight dark:text-white text-justify font-bold'>
                Elektroninis paštas: info@spt.lt
            </p>
            <form onSubmit={handleSubmit} className='w-full max-w-md mt-10 border-4 border-red-500 rounded-lg p-5'>                <label className='text-1xl text-gray-900 font-extralight dark:text-white text-justify font-bold mb-2'>Susisiekite su mumis elektroniniu paštu!</label>
<div class="relative mb-2">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  </div>
  <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jūsų el. paštas">
</input>
</div>
                <textarea
                    className='w-full h-32 p-2 border border-gray-300 rounded-md bg-gray-50'
                    placeholder='Parašykite žinutę...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit" className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Siųsti laišką
                </button>
            </form>
        </div>
    );
}

export default Contacts;
