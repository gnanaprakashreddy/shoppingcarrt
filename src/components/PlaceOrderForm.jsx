import { useState } from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import SuccessDialog from "./SuccessDialog";
import { useDispatch, useSelector } from "react-redux";
import { placeFormActions } from "./store/placeorderformslice";
import { cartActions } from "./store/cartslice";

export default function PlaceOrderForm({ cartTotal }) {
  const dispatch = useDispatch();

  const showSuccessMsg = useSelector(
    (state) => state.placeorder.showSuccessMsg
  );
  const cartItems = useSelector((state) => state.cart.cartItems);
  const open = useSelector((state) => state.cart.showForm);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const orderData = {
      items: [...cartItems],
      customer: {
        name: data.fullName,
        email: data.email,
        street: data.street,
        city: data.city,
        "postal-code": data.postalcode,
      },
    };
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderData }),
      });
      const result = await response.json();
      dispatch(placeFormActions.showSuccessMsg(true));
      dispatch(cartActions.clearCart());
    } catch (e) {
      dispatch(placeFormActions.showSuccessMsg(false));
    }
  }

  function handleFormClose() {
    dispatch(cartActions.showForm(false));
    dispatch(cartActions.showCart(false));
  }

  return (
    <>
      {!showSuccessMsg && (
        <Modal open={open}>
          <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount : ${cartTotal}</p>
            <div className="control">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" id="fullName" required />
              <label htmlFor="email">E-Mail Address</label>
              <input type="email" name="email" id="email" required />
              <label htmlFor="street">Street</label>
              <input type="text" name="street" id="street" required />
              <div className="control-row">
                <div className="control">
                  <label htmlFor="postalcode">Postal Code</label>
                  <input
                    type="number"
                    name="postalcode"
                    id="postalcode"
                    min={100000}
                    max={999999}
                    required
                  />
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" id="city" required />
                </div>
              </div>
              <div className="modal-actions">
                <Button textOnly onClick={handleFormClose}>
                  Close
                </Button>
                <Button type="submit">Submit Order</Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
      {showSuccessMsg && <SuccessDialog />}
    </>
  );
}
