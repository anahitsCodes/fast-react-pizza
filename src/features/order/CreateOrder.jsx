import {useEffect, useState} from "react";
import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {createOrder} from "../../services/apiRestaurant.js";
import error from "../../ui/Error.jsx";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clear, getCart, getTotalCartPrice} from "../cart/cartSlice.jsx";
import store from "../../store.jsx";
import {formatCurrency} from "../../utils/helpers.js";
import {fetchAddress} from "../user/userSlice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  useEffect(() => {
    console.log('dv:', 'mounted')
  }, []);
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const {username, address, position, status: addressStatus, error: errorAddress } = useSelector(state => state.user);

  const isLoadingAddress = addressStatus === "loading"
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = priorityPrice + totalCartPrice;

  const dispatch = useDispatch()
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method={"POST"}>
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input className="input w-full" type="text" defaultValue={username} name="customer" required/>

          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required/>
            {formErrors?.phone &&
              <p className="text-xs bg-red-100 p-2 rouded-md mt-2 text-red-700">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow ">
            <input type="text" defaultValue={address} disabled={isLoadingAddress} name="address" required className="input w-full"/>
            {addressStatus==='error' &&
              <p className="text-xs bg-red-100 p-2 rouded-md mt-2 text-red-700">{errorAddress}</p>}
          </div>
          {!position.longitude && !position.latitude && <span className="absolute top-3 md:right-[5px] md:top-[5px] right-[3px] z-50">
              <Button type="small" disabled={isLoadingAddress} onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress())
              }}>Get Position</Button>
            </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
          <input type={"hidden"} name="cart" value={JSON.stringify(cart)} className=" font-medium"/>
          <input type={"hidden"} name="position" value={position.longitude && position.latitude ? `${position.longitude}, ${position.latitude}`: ""} className=" font-medium"/>

        </div>
        <div>
          <Button type="primary"
                  disabled={isSubmitting || isLoadingAddress }>{isSubmitting ? "Placing Order..." : `Order now from  ${formatCurrency(totalPrice)}`} </Button>

        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  }
  const errors = {};

  if (!isValidPhone(order.phone)) errors.phone = "Please enter your correct phone number";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clear())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
