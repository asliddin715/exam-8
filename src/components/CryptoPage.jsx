import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Drawer } from "flowbite-react";
import { Link } from "react-router-dom";
import Carusel from "./Carousel";
import CustomNavbar from "./Navbar";

const Country = ({ countryCode }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&sparkline=false&price_change_percentage=24h`
                );
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    useEffect(() => {
        const savedCountries = JSON.parse(localStorage.getItem("selectedCountries")) || [];
        setSelectedRows(savedCountries);
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedCountries", JSON.stringify(selectedRows));
    }, [selectedRows]);

    const onPageChange = (page) => setCurrentPage(page);

    const handleRowClick = (crypto) => {
        const cryptoId = crypto.id;
        setSelectedRows((prev) =>
            prev.find((row) => row.id === cryptoId)
                ? prev.filter((row) => row.id !== cryptoId)
                : [...prev, crypto]
        );
    };

    const handleDrawerOpen = () => setIsOpen(true);
    const handleDrawerClose = () => setIsOpen(false);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleRemove = (cryptoId) => {
        setSelectedRows((prev) => prev.filter((row) => row.id !== cryptoId));
    };

    const filteredItems = data.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="overflow-x-auto bg-[#030303]">
            <CustomNavbar handleDrawerOpen={handleDrawerOpen} />
            <Carusel countries={selectedRows} />
            <div className="flex flex-col justify-center">
                <h1 className="text-center text-[34px] font-[400] mb-4 mt-2 text-white">
                    Cryptocurrency Prices by Market Cap
                </h1>
                <input
                    type="text"
                    placeholder="Search For a Crypto Currency.."
                    className="w-[1280px] p-3 outline-[#515151] border-[#515151] bg-[#16171A] m-auto mb-5 text-white hover:outline-none"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="w-[1280px] m-auto">
                <Table className="bg-[#16171A]">
                    <Table.Head>
                        <Table.HeadCell className="bg-[#87CEEB] text-[#000000] py-4">
                            Coin
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-[#87CEEB] text-[#000000] text-center">
                            Price
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-[#87CEEB] text-[#000000] text-center">
                            24h Change
                        </Table.HeadCell>
                        <Table.HeadCell className="bg-[#87CEEB] text-[#000000] text-end">
                            Market Cap
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentItems.map((crypto) => {
                            const cryptoId = crypto.id;
                            const isSelected = selectedRows.some((row) => row.id === cryptoId);
                            const changeClass = crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500";
                            return (
                                <Table.Row
                                    key={cryptoId}
                                    className={`dark:border-gray-700 dark:bg-gray-800 cursor-pointer border-[#515151]`}
                                    onClick={() => handleRowClick(crypto)}
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white py-7">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <img className="w-[50px]" src={crypto.image} alt={crypto.name} />
                                            </div>
                                            <div>
                                                <Link
                                                    to={`/crypto/${crypto.id}`}
                                                    className="text-[22px] text-white font-[400]"
                                                >
                                                    {crypto.symbol.toUpperCase()}
                                                </Link>
                                                <h4 className="text-[#A9A9A9] font-[400] text-[14px]">
                                                    {crypto.name}
                                                </h4>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="text-center ">
                                        <h3>${crypto.current_price.toLocaleString()}</h3>
                                    </Table.Cell>
                                    <Table.Cell className={`text-center ${changeClass}`}>
                                        <div className="flex gap-2 justify-center">
                                            <button onClick={handleDrawerOpen}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 -960 960 960"
                                                    width="24px"
                                                    fill={isSelected ? "#6ee7b7" : "white"}
                                                >
                                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                                </svg>
                                            </button>
                                            <h4>{crypto.price_change_percentage_24h.toFixed(2)}%</h4>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="text-end">{crypto.market_cap.toLocaleString()}M</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
            <div className="m-auto flex justify-center mb-10 mt-5">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
                    onPageChange={onPageChange}
                    className="bg-black text-white"
                    renderPaginationButton={(props) => (
                        <button
                            {...props}
                            className={`${
                                props.active ? "bg-black text-white font-bold" : "text-white"
                            } px-3 py-2 rounded-md mx-1`}
                        >
                            {props.children}
                        </button>
                    )}
                />
            </div>

            <Drawer
                open={isOpen}
                onClose={handleDrawerClose}
                position="right"
                className="bg-[#515151] w-[500px] px-8"
            >
                <Drawer.Header />
                <Drawer.Items>
                    <h2 className="text-white text-[30px] text-center mb-5">WATCHLIST</h2>
                    <div className="flex flex-wrap justify-between">
                        {selectedRows.map((crypto) => (
                            <div
                                key={crypto.id}
                                className="mb-4 bg-[#14161A] flex flex-col items-center p-4 gap-2 rounded-[25px] w-[200px]"
                            >
                                <img className="w-[110px]" src={crypto.image} alt={crypto.name} />
                                <h4 className="mt-3 text-[20px] text-white">${crypto.market_cap.toLocaleString()}</h4>
                                <button
                                    className="bg-[#FF0000] px-5 py-1 rounded- text-white"
                                    onClick={() => handleRemove(crypto.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </Drawer.Items>
            </Drawer>
        </div>
    );
};

export default Country;
