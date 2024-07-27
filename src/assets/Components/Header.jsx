import { useContext, useEffect } from "react";
import logoImg from "../logo.jpg";
import Button from "./Button";
import CartContntext from "../../store/CartContext";
import UserProgresContext from "../../store/UserProgressContext";

export default function Header() {
  const ctx = useContext(CartContntext);
  const userProgerssCtx = useContext(UserProgresContext);

  const totalCart = ctx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleShowModal() {
    userProgerssCtx.showCart();
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        userProgerssCtx.hideCart();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header id="main-header">
      <h1 id="title">
        <img src={logoImg} alt="Logo Image" />
        Burger Food
      </h1>

      <Button classes="text-button" type="button" onClick={handleShowModal}>
        Cart ({totalCart})
      </Button>
    </header>
  );
}
