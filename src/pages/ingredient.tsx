import React from "react";
import pageStyles from "./pages.module.css";
import styles from "./ingredient.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

const IngredientPage = () => {
  return (
    <section className={styles.container}>
      <div className={`mt-10`}>
        <p className={`${pageStyles.title} text text_type_main-large`}>
          Детали ингредиента
        </p>
      </div>
      <IngredientDetails />
    </section>
  );
};

export default IngredientPage;
