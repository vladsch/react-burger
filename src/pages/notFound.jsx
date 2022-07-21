import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {useHistory} from "react-router-dom";
import styles from "./notFound.module.css";

function NotFoundPage() {
  const history = useHistory();
  const goToHome = () => {
      history.push("/");
  };
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>404</h1>
      <p className="text text_type_main-large mb-20">Страница не найдена</p>
      <Button type="primary" size="medium" onClick={goToHome}>
        Перейти на главную страницу
      </Button>
    </section>
  );
}

export default NotFoundPage;
