import { useState } from "react";
import PlaceOrderForm from "./PlaceOrderForm";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store/cartslice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isPlaceOrderFormOpen = useSelector((state) => state.cart.showForm);
  const dispatch = useDispatch();

  let totalCartValue = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalCartValue += Number(cartItems[i].meal.price * cartItems[i].quantity);
  }

  function handleIncrement(item) {
    dispatch(cartActions.addToCart(item.meal));
  }

  function handleDecrement(item) {
    dispatch(cartActions.removeFromCart(item));
  }

  function handlePlaceOrder() {
    dispatch(cartActions.showForm(true));
  }

  function handleCartClose() {
    dispatch(cartActions.showCart(false));
  }

  return (
    <>
      {/* <Modal className="backdrop" onClick={onClose}></Modal> */}
      {/* <div className="modal"> */}
      {!isPlaceOrderFormOpen && (
        <Modal className="cart" open={isCartOpen}>
          <h2>Your Cart</h2>
          <ul>
            {cartItems.map((item, key) => {
              return (
                <div className="cart-item" key={key}>
                  <p>
                    {item.meal.name} - {item.quantity} x ${item.meal.price}
                  </p>
                  <div className="cart-item-actions">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </ul>
          <div className="cart-total">Total - ${totalCartValue}</div>
          <div className="modal-actions">
            <Button textOnly onClick={handleCartClose}>
              Close
            </Button>
            <Button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </Button>
          </div>
        </Modal>
      )}
      {isPlaceOrderFormOpen && <PlaceOrderForm cartTotal={totalCartValue} />}
    </>
  );
}
