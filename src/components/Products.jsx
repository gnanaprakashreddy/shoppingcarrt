import { useState } from "react";
import { useEffect } from "react";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { mealActions } from "./store/mealslice";
import { cartActions } from "./store/cartslice";

export default function Products() {
  const meals = useSelector((state) => state.meals.meals);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch the meals.., Try again..!");
        }
        dispatch(mealActions.setMeals(data));
      } catch (errMsg) {
        setError({
          msg: errMsg,
        });
      }
    }
    fetchMeals();
  }, []);

  function handleAddToCart(id) {
    const meal = meals.at(id);
    dispatch(cartActions.addToCart(meal));
  }

  const addedMeals = cartItems.map((item) => item.meal.id);

  return (
    <ul id="meals">
      {meals.map((meal, id) => {
        return (
          <li className="meal-item" key={id}>
            <article>
              <img src={`http://localhost:3000/${meal.image}`} alt="image" />
              <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">${meal.price}</p>
                <p className="meal-item-description">{meal.description}</p>
              </div>
              <p className="meal-item-actions">
                {cartItems.length > 0 && addedMeals.indexOf(meal.id) !== -1 ? (
                  <Button>Added</Button>
                ) : (
                  <Button onClick={() => handleAddToCart(id)}>
                    Add to Cart
                  </Button>
                )}
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
