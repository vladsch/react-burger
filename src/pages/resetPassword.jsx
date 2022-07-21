import React, { useEffect } from "react";
import {
  Button,
  Input, PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword} from "../services/actions/authActions";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const {isAuthorized, resetPassword:passwordWasReset} = useSelector((store) => store.auth);
  const location = useLocation();
  const history = useHistory();
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState('');

  useEffect(() => {
    if (isAuthorized) {
      history.replace(location?.state?.from || '/');
    }

    if (location.state !== "forgot-password") {
      history.push("/forgot-password");
    }

    if (passwordWasReset) {
      history.push("/login");
    }
  }, [isAuthorized, passwordWasReset]);

  const onChange = (setter, e) => {
    setter(e.target.value);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      setError('Введите свой пароль');
      return;
    }

    if (!code) {
      setError('Введите код из письма');
      return;
    }

    const invalidField = e.target.querySelector('.input_status_error');
    if (invalidField) {
      setError('Проверьте правильность заполнения полей');
      return;
    }

    setError('');
    dispatch(resetPassword(password, code));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h2>
        <form onSubmit={onSubmit} className={pagesStyles.form}>
          <div className={`${pagesStyles.p100} mt-6`}>
            <PasswordInput
              placeholder="Введите новый пароль"
              value={password}
              onChange={(e) => onChange(setPassword, e)}
            />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              value={code}
              onChange={(e) => onChange(setCode, e)}
            />
          </div>

          {error && (
              <p className={`${pagesStyles.errorText} text text_type_main-default mt-4 mb-4`}>
                {error}
              </p>
          )}

          <div className="mt-6">
            <Button type="primary" size="medium">
              Сохранить
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
};

export default ResetPasswordPage;
