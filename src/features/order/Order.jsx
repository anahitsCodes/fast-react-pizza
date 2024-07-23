// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import React, {useEffect} from "react";
import {useFetcher, useLoaderData} from "react-router-dom";
import {getOrder} from "../../services/apiRestaurant.js";
import OrderItem from "./OrderItem.jsx";
import UpdateOrder from "./updateOrder.jsx";


function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
 const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const fetcher = useFetcher();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if(!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu")
    }
  }, [fetcher]);
  
  console.log('dv:', fetcher.data)
  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between gap-2  flex-wrap">
        <h2 className="text-xl font-semibold">Status</h2>

        <div className="space-x-2 ">
          {priority && <span className="bg-red-500 rounded-full text-red-50 uppercase py-1 px-3 text-sm">Priority</span>}
          <span  className="bg-green-500 rounded-full text-green-50 uppercase py-1 px-3 text-sm">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 bg-stone-200 py-5 px-6 flex-wrap">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map(item => <OrderItem item={item} isLoadingIngredients={fetcher.state === "loading"} ingredients={fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ?? []} key={item.pizzaId}/>)}
      </ul>

      <div className=" spce-y-2 bg-stone-200 px-6 py-5 flex justify-between ">
       <div className="flex flex-col">
         <p className="text-sm font-medium texte-stone-800">Price pizza: {formatCurrency(orderPrice)}</p>
         {priority && <p className=" font-bold">Price priority: {formatCurrency(priorityPrice)}</p>}
         <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
       </div>
        <div className="flex flex-row">
          {!priority && <UpdateOrder/> }

        </div>

      </div>
    </div>
  );
}

export async function loader({params}) {
  const order = await getOrder(params.orderId)
  return order;
}

export default Order;
