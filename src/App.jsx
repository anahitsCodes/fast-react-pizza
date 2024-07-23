import React from 'react';
import Home from "./ui/Home.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Menu, {loader as menuLoader} from "./features/menu/Menu.jsx";
import CreateOrder, {action as createNewOrderAction} from "./features/order/CreateOrder.jsx";
import Order,  {loader as orderLoader} from "./features/order/Order.jsx";
import Cart from "./features/cart/Cart.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import "./index.css";
import Error from "./ui/Error.jsx";
import {action as updateOrderAction} from "./features/order/updateOrder.jsx";


const router = createBrowserRouter([
  {element: <AppLayout/>,
    errorElement: <Error/>,
  children: [
    {path: "/", element: <Home/>},
    {path: "/menu", element: <Menu/>, loader: menuLoader,  errorElement: <Error/> },
    {path: "/order/new", element: <CreateOrder/>, action: createNewOrderAction},
    {path: "/order/:orderId", element: <Order/>, errorElement: <Error/>, loader: orderLoader, action: updateOrderAction},
    {path: "/cart", element: <Cart/>}
  ]}
])

function App() {
  return (
   <RouterProvider router={router}/>
  );
}

export default App;