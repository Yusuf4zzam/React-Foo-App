import { useContext } from "react";
import CartContntext from "../../store/CartContext.jsx";
import Button from "./Button.jsx";

export default function MealItems({ meal }) {
  const cartContext = useContext(CartContntext);

  function handleClick() {
    cartContext.handleAddItem(meal);
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="meal-item">
      <article>
        <h2>{meal.name}</h2>
        <img src={`http://localhost:3000/${meal.image}`} alt="Meal Image" />
        <p className="meal-item-description">{meal.description}</p>
        <span className="meal-item-price">{formatter.format(meal.price)}</span>
        <Button classes="button" type="button" onClick={handleClick}>
          Add to Cart
        </Button>
      </article>
    </div>
  );
}
