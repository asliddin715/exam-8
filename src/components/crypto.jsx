import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomNavbar from "./Navbar";
import { Button } from "flowbite-react";

import LineChart from "./LineChart";
const CryptoDetail = () => {
    const { cryptoId } = useParams(); // Get the cryptoId from the route parameters
    const [crypto, setCrypto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrypto = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setCrypto(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrypto();
    }, [cryptoId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-[#16171A]">
            <CustomNavbar />
            <div className=" bg-[#16171A] m-auto w-[1500px] ">
                <div className="m-auto flex h-full items-start justify-between  p-5 ">
                    <div className="flex flex-col border-r w-[550px] px-10 text-start">
                        <div>
                            <img className="w-[200px] m-auto" src={crypto.image.large} alt={crypto.name} />
                            <h1 className="font-sans text-[48px] font-[700] text-center mb-2 text-white">{crypto.name}</h1>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className={`text-white text-[16px] font-[400] ${crypto.description.en.length == 0 ? "h-0 overflow-hidden" : "overflow-hidden h-[162px]"}`}>
                                {crypto.description.en}
                            </p>

                            <h3 className="text-white text-[24px] font-[700]">Rank: {crypto.market_cap_rank}</h3>
                            <p className="text-white text-[24px] font-[700]">Current Price: ${crypto.market_data.current_price.usd}</p>
                            <p className="text-white text-[24px] font-[700]">Market Cap: ${crypto.market_data.market_cap.usd.toLocaleString()}</p>

                        </div>
                    </div>
                    <div className="w-[1000px] h-[600px] ">

                        <LineChart />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CryptoDetail;
