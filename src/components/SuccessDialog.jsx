import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { placeFormActions } from "./store/placeorderformslice";
import { cartActions } from "./store/cartslice";

export default function SuccessDialog() {
  const dispatch = useDispatch();

  function handleOkayClick() {
    dispatch(placeFormActions.showSuccessMsg(false));
    dispatch(cartActions.showForm(false));
    dispatch(cartActions.showCart(false));
  }

  return (
    <Modal open={true}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>
        We will get back to you with more details via email within next few
        minutes
      </p>
      <Button onClick={handleOkayClick}>Okay</Button>
    </Modal>
  );
}
