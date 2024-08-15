import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button, Navbar as FlowbiteNavbar } from "flowbite-react";

function CustomNavbar({ handleDrawerOpen }) {
    return (
        <header className='  bg-black flex justify-center text-center'>
            <FlowbiteNavbar className="w-[1240px] m-auto bg-black p-5 ">
                <Link to={"/"}><img src="/logo.svg" alt="loading" /></Link>
                <div className='flex gap-9 items-center'>
                    <h4 className='text-white text-[16px] font-[400] flex items-center gap-4'>USD <img src="/bot.png" alt="laoding" /> </h4>
                    <Button className='bg-[#87CEEB] text-black' onClick={handleDrawerOpen}>WATCH LIST</Button>
                </div>
            </FlowbiteNavbar>

        </header>

    );
}

export default CustomNavbar;
