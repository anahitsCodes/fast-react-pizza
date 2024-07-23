import React from 'react';
import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {decreaseItemQuantity, increaseItemQuantity} from "./cartSlice.jsx";

function UpdateItemQuantity({id, quantity}) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-3 items-center md:gap-3">
      <Button type="round" onClick={()=>dispatch(increaseItemQuantity(id))}>+</Button>
      <p>{quantity} </p>
      <Button type="round" onClick={()=> dispatch(decreaseItemQuantity(id))}>-</Button>
    </div>
  );
}

export default UpdateItemQuantity;