import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
const navigate = useNavigate();
 function handleSubmit(e){

   e.preventDefault()
   if(!query) return
    navigate(`/order/${query}`)
   setQuery("")

 }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} placeholder={"search order"}
             onChange={(e)=>setQuery(e.target.value)}
             className="rounded-full px-4 py-2 focus:outline-none focus:ring w-28 transition-all
             duration-300 focus:w-72 placeholder:text-stone-400 text-sm focus:ring-yellow-500
              sm:focus:w-72 bg-yellow-100 focus:ring-opacity-5 sm:w-64"/>
    </form>
  );
}

export default SearchOrder;