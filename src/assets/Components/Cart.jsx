import { useContext } from "react";
import Modal from "./Modal.jsx";

import CartContntext from "../../store/CartContext.jsx";

import UserProgresContext from "../../store/UserProgressContext.jsx";
import Button from "./Button.jsx";
export default function Cart() {
  const ctx = useContext(CartContntext);
  const userProgresCtx = useContext(UserProgresContext);

  const cartTotal = ctx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function handleCloseCart() {
    userProgresCtx.hideCart();
  }

  function handlePlusBtn(item) {
    ctx.handleAddItem(item);
  }

  function handleMinusBtn(item) {
    ctx.handleRemoveItem(item);
  }

  function handleCheckoutClick() {
    userProgresCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={userProgresCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {ctx.items.map((item) => (
          <li key={item.id} className="cart-item">
            (x{item.quantity}) {item.name} - {formatter.format(item.price)}
            <div className="cart-item-actions">
              <Button onClick={() => handlePlusBtn(item)}>+</Button>
              <p>{item.quantity}</p>
              <Button onClick={() => handleMinusBtn(item.id)}>-</Button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {formatter.format(cartTotal)}</p>

      <div className="modal-actions">
        <Button classes="text-button" onClick={handleCloseCart}>
          Close
        </Button>
        {ctx.items.length > 0 && (
          <Button classes="button" onClick={handleCheckoutClick}>
            Checkout
          </Button>
        )}
      </div>
    </Modal>
  );
}
