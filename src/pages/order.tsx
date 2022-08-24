import React from "react";
import pageStyles from "./pages.module.css";
import styles from "./ingredient.module.css";
import OrderTapeCardDetails from "../components/order-tape-card-details/order-tape-card-details";

const OrderPage = () => {
  return (
    <section className={styles.container}>
      <div className={`mt-10 mb-10`}>
        <p className={`${pageStyles.title} text text_type_main-large`}>
          Детали заказа
        </p>
      </div>
      <OrderTapeCardDetails />
    </section>
  );
};

export default OrderPage;
