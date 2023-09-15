import React, { useState, useEffect } from 'react';

const BrandSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const brands = [
        // Remplacez ces valeurs par les données de vos marques
        'http://ticketrestaurantpro.com/imgESP_EM/UberEat.svg',
        'http://ticketrestaurantpro.com/imgESP_EM/Glovo.svg',
        'http://ticketrestaurantpro.com/imgESP_EM/JustEat.svg',
        // ...
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
        }, 3000); // Changer l'intervalle de défilement si nécessaire

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-24">
            {brands.map((brand, index) => (
                <img
                    key={index}
                    src={brand}
                    alt={`Marque ${index + 1}`}
                    className={`w-16 h-16 mx-4 transition-opacity ${index === currentIndex ? 'opacity-100' : 'opacity-50'
                        }`}
                />
            ))}
        </div>
    );
};

export default BrandSlider;