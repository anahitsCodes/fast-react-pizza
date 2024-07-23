import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItem, getCurrentQuantityById} from "../cart/cartSlice.jsx";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/updateItemQuantity.jsx";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl} = pizza;
const currentQuantity = useSelector(getCurrentQuantityById(id))
const dispatch = useDispatch();
console.log('dv:', pizza)

function handleAddToCart(){
  dispatch(addItem({pizzaId: id, name, quantity: 1, unitPrice, totalPrice: unitPrice}))
}

const isInCart  = currentQuantity > 0;
  return (
    <li className="flex gap-4 py-2" >
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className="flex flex-col grow pt-0.5 ">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize"> {ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? <p className="text-sm uppercase font-medium text-stone-500">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {isInCart &&
            <div className="flex gap-3 sm:gap-4">
              <UpdateItemQuantity id={id} quantity={currentQuantity}/>
              <DeleteItem id={id}/>
            </div>}
          {!soldOut && !isInCart && <Button type="small" onClick={()=>handleAddToCart()}>Add to Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
