import { useContext, useState } from "react";
import Modal from "./Modal.jsx";

import CartContntext from "../../store/CartContext.jsx";

import UserProgresContext from "../../store/UserProgressContext.jsx";
import Button from "./Button.jsx";
import Error from "./Error.jsx";
export default function Cart() {
  const ctx = useContext(CartContntext);
  const userProgresCtx = useContext(UserProgresContext);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleCloseBtn() {
    userProgresCtx.hideCheckout();

    setIsSuccess(false);
    setIsError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: ctx.items,
          customer: data,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setIsError(false);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsError(true);
        setIsSuccess(false);
      });
  }

  if (isSuccess) {
    return (
      <Modal className="cart" open={userProgresCtx.progress === "checkout"}>
        <h2>Your Data Has Been Dilvered</h2>
        <ul>
          {ctx.items.map((item) => (
            <li key={item.id} className="cart-item">
              (x{item.quantity}) {item.name} - {item.price}
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <Button
            classes="text-button"
            onClick={() => {
              handleCloseBtn();
              ctx.handleClearCart();
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal className="modal" open={userProgresCtx.progress === "checkout"}>
      <div className="cart-total" style={{ justifyContent: "flex-start" }}>
        Total:{" "}
        {ctx.items.reduce((total, item) => {
          return total + item.quantity * item.price;
        }, 0)}
      </div>
      <form onSubmit={handleSubmit} className="control">
        <div className="control-row">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" id="name" />
        </div>

        <div className="control-row">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div className="control-row">
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" />
        </div>

        <div className="control-row">
          <label htmlFor="street">Street</label>
          <input type="text" name="street" id="street" />
        </div>

        {isError && (
          <Error
            title="Error"
            message="An error occurred while submitting the order."
          ></Error>
        )}

        <div className="modal-actions">
          <Button classes="text-button" type="button" onClick={handleCloseBtn}>
            Close
          </Button>
          <Button classes="button">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
