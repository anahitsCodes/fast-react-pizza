import LinkButton from "../../ui/LinkButton.jsx";
import {useSelector} from "react-redux";
import {getTotalCartQuantity, getTotalCartPrice} from "./cartSlice.jsx";

function CartOverview() {
const totalCartQuantity = useSelector(getTotalCartQuantity);
const totalCartPrice = useSelector(getTotalCartPrice)

  if(!totalCartQuantity) return ;


  return (
    <div className="bg-stone-800 px-4 py-4 uppercase sm:px-6 flex items-center justify-between">
      <p className="text-stone-300 space-x-4 sm:space-x-6  font-semibold text-sm md:text-base">
        <span >{totalCartQuantity} pizzas</span>
        <span >${totalCartPrice}</span>
      </p>
      <LinkButton to="/cart" className="text-stone-200">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
