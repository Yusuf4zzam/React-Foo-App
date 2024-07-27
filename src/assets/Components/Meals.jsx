import { useEffect, useState } from "react";
import MealItems from "./MealItems";
import SpinnerLoading from "./SpinnerLoading";
import Error from "./Error";

export default function Meals() {
  const [mealsData, setMealsData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsFetched(false);

    fetch("http://localhost:3000/meals")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setMealsData(data);
      })
      .catch((error) => {
        setError(error);
      });
    setIsFetched(true);
  }, []);

  return (
    <div id="meals">
      {!isFetched && <SpinnerLoading />}
      {error && (
        <Error
          title="Error"
          message="An error occurred while submitting the order."
        ></Error>
      )}{" "}
      {mealsData.map((meal) => (
        <MealItems meal={meal} key={meal.id} />
      ))}
    </div>
  );
}
