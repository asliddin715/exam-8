import React, { useState, useEffect } from 'react';
import { Carousel } from "flowbite-react";

const Carusel = ({ countries }) => {
    const [shouldMove, setShouldMove] = useState(false);

    // Combine default items with selected countries
    const displayItems = [...countries];

    // Group items in sets of four
    const groupedItems = [];
    for (let i = 0; i < displayItems.length; i += 4) {
        groupedItems.push(displayItems.slice(i, i + 4));
    }

    // Start moving the carousel only when new countries are added
    useEffect(() => {
        if (countries.length > 0) {
            setShouldMove(true);
        }
    }, [countries]);

    return (
        <div className='bg-[url(/bg.jpeg)] h-[450px] pt-12'>
            <div className='m-auto'>
                <h2 className="text-center text-[60px] font-[700] text-[#87CEEB]">CRYPTOFOLIO WATCH LIST</h2>
                <p className='text-white text-center text-[18px] font-[400]'>Get all the Info regarding your favorite Crypto Currency</p>
            </div>
            <div className="h-[180px] mt-14 m-auto b-black">
                <Carousel indicators={false} leftControl="left" rightControl="right" slide={shouldMove}>
                    {groupedItems.map((itemGroup, index) => (
                        <div key={index} className="h-56 sm:h-64 xl:h-80 2xl:h-96 flex items-center justify-around w-[1280px]">
                            {itemGroup.map((item) => (
                                <div key={item.id} className="flex flex-col items-center">
                                    <img className='object-contain w-[80px] h-[80px] mb-2' src={item.image} alt={item.name} />
                                    <div className="text-center flex items-center gap-2">
                                        <h3 className="font-[400] text-white text-[16px]">{item.symbol.toUpperCase()}</h3>
                                        <h3 className={`text-[16px] ${item.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                                            {item.price_change_percentage_24h.toFixed(2)}%
                                        </h3>
                                    </div>
                                    <h3 className='text-white text-[21px]'>${item.current_price.toLocaleString()}</h3>
                                </div>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Carusel;
