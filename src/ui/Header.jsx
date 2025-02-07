import React from 'react';
import {Link} from "react-router-dom";
import CartOverview from "../features/cart/CartOverview.jsx";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

function Header() {
  return (
    <header className=" bg-yellow-400 border-b border-stone-200 px-4 py-3 sm:px-6 flex items-center justify-between">
        <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
        <SearchOrder/>
        <Username/>


    </header>

  );
}

export default Header;