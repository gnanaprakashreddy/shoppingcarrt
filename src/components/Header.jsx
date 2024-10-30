import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import Cart from "./Cart";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store/cartslice";

export default function Header() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(cartActions.showCart(false));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleToggleCart(showCart) {
    dispatch(cartActions.showCart(showCart));
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="Food Logo" />
        <h1>React Food App</h1>
      </div>
      <Button textOnly onClick={() => handleToggleCart(true)}>
        Cart ({cartItems.length})
      </Button>
      {isCartOpen && <Cart />}
    </div>
  );
}
