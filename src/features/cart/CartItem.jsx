import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {deleteItem} from "./cartSlice.jsx";
import DeleteItem from "./DeleteItem.jsx";
import UpdateItemQuantity from "./updateItemQuantity.jsx";

function CartItem({item}) {

  const {pizzaId, name, quantity, totalPrice} = item;
  const dispatch = useDispatch()

  return (
    <li className=" py-3  sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} quantity={quantity}/>
        <DeleteItem id={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
