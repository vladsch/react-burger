import React, { useEffect } from "react";
import {
  Button, EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import { Link, useHistory } from "react-router-dom";
import {askToResetPassword, login} from "../services/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

export default function RestorePasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState('');

  const onChange = (setter, e) => {
    setter(e.target.value);
    setError('');
  };

  useEffect(() => {
    if (!auth.isAuthorized && auth.email)
      history.push("/forgot-password/reset", 'forgot-password');
  }, [auth, history]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Введите свой email');
      return;
    }

    const invalidField = e.target.querySelector('.input_status_error');
    if (invalidField) {
      setError('Проверьте правильность заполнения полей');
      return;
    }

    setError('');
    dispatch(askToResetPassword(email));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form onSubmit={onSubmit} className={pagesStyles.form}>
          <div className={`${pagesStyles.p100} mt-6`}>
            <EmailInput
                name={'email'}
                placeholder="Укажите e-mail"
                value={email}
                onChange={(e) => onChange(setEmail, e)} />
          </div>
          {error && (
              <p className={`${pagesStyles.errorText} text text_type_main-default mt-4 mb-4`}>
                {error}
              </p>
          )}
          <div className="mt-6">
            <Button type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вспомнили пароль?
          <Link to="/login" className={pagesStyles.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
