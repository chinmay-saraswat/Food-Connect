import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [city, setCity] = useState('');
    const [ngos, setNgos] = useState([]);
    const [error, setError] = useState('');
    const [showNgos, setShowNgos] = useState(false);
    const getCityFromCoordinates = async (latitude, longitude) => {
        const apiKey = '5ea974fb736c4bbd94115c46c94770e4'; // Replace with your actual OpenCage API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            if (response.data.results.length > 0) {
                const components = response.data.results[0].components;
                const city = components.city || components.town || components.village;
                return city ? city.toLowerCase() : 'unknownLocation';
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching city:', error);
            return null;
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const cityName = await getCityFromCoordinates(latitude, longitude);
                if (cityName) {
                    setCity(cityName);
                    setShowNgos(true);  
                    fetchNgos(cityName);
                } else {
                    setError('Unable to fetch city name.');
                }
            }, (error) => {
                console.error('Error getting location:', error);
                setError('Unable to retrieve your location.');
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const fetchNgos = async (city) => {
      try {
          const response = await axios.get(`http://localhost:3000/ngo/${city}`);
          console.log('NGOs fetched:', response.data); // Debug log
          setNgos(response.data);

      } catch (error) {
          console.error('Error fetching NGOs:', error);
          setError('Error fetching NGOs.');
      }
  };

    return (
      <div className='flex flex-col justify-center h-screen bg-gray-200 '>
      <div className='flex justify-center '>
      <div className=' p-20'>
      <button 
        onClick={handleGetLocation}
        className="w-52 h-52 rounded-full bg-blue-500 text-white text-xl font-bold flex items-center justify-center shadow-lg transition duration-300 ease-in-out transform hover:scale-110 m-3"
                >Show NGOs </button>

                {showNgos && (
                    <div className="text-center">
                        {ngos.length > 0 ? (
                            ngos.map(ngo => (
                                <div key={ngo._id} className="my-2 p-4 bg-white shadow-md rounded-md">
                                    <h3 className="text-lg font-semibold">{ngo.ngoName}</h3>
                                    <p>contacts: {ngo.phoneNo}</p>
                                    <p>{ngo.city}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-red-500">No NGOs found</p>
                        )}
                        <button 
                            onClick={() => setShowNgos(false)}
                            className="mt-4 px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Back
                        </button>
                    </div>
                )}
      </div>
      </div>
  </div>
    );
};

export default App;
