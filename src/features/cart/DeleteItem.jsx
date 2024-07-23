import React from 'react';
import Button from "../../ui/Button.jsx";
import {deleteItem, getCart} from "./cartSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import cartItem from "./CartItem.jsx";

function DeleteItem({id}) {

  const dispatch = useDispatch()
  return (
    <Button type="small" onClick={() =>  dispatch(deleteItem(id))}>Delete</Button>

  );
}

export default DeleteItem;