import { Link } from 'react-router-dom';
import LinkButton from "../../ui/LinkButton.jsx";
import Button from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clear, getCart} from "./cartSlice.jsx";
import EmptyCart from "./EmptyCart.jsx";

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(state=> state.user.username)
  const dispatch = useDispatch();

  if(!cart.length) return <EmptyCart/>
  return (
    <div className="px-4 py-3">

      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-200 border-b mt-3  ">
        {cart.map(item => <CartItem item={item} key={item.pizzaId}/>)}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={()=>dispatch(clear())}>Clear cart</Button>

      </div>
    </div>
  );
}

export default Cart;
