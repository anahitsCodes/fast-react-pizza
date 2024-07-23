import { Link } from 'react-router-dom';
import LinkButton from "../../ui/LinkButton.jsx";

function EmptyCart() {
  return (
    <div className="flex flex-col px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="m-auto font-semibold">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
