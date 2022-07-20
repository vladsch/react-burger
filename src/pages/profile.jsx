import React, { useEffect } from "react";
import pagesStyles from "./pages.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from "../services/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileMenu from "../components/profile-menu/profile-menu";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth);

  const [name, setName] = React.useState(user.name);
  const [barVisible, setBarVisible] = React.useState(false);
  const [email, setEmail] = React.useState(user.email);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  const onChange = (setter, e) => {
    setter(e.target.value);
    setBarVisible(true);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Введите свой email');
      return;
    }

    if (!name) {
      setError('Введите своё имя');
      return;
    }

    const invalidField = e.target.querySelector('.input_status_error');
    if (invalidField) {
      setError('Проверьте правильность заполнения полей');
      return;
    }

    setError('');
    dispatch(updateUser(name, email, password));
    setBarVisible(false);
  };

  const onCancel = (e) => {
    e.preventDefault();

    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setBarVisible(false);
    setError('');
  };

  return (
    <section className={pagesStyles.page}>
      <ProfileMenu />
      <div className="ml-15">
        <form className={pagesStyles.form} onSubmit={onSubmit}>
          <div className={`${pagesStyles.p100} mt-6`}>
            <Input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => onChange(setName, e)}
            />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <EmailInput
              type="email"
              placeholder="Логин"
              value={email}
              onChange={(e) => onChange(setEmail, e)}
            />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <PasswordInput
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => onChange(setPassword, e)}
            />
          </div>
          {error && (
              <p className={`${pagesStyles.errorText} text text_type_main-default mt-4 mb-4`}>
                {error}
              </p>
          )}
          <div className={`${pagesStyles.bar} ${barVisible ? '' : pagesStyles.hiddenVisibility} mt-6`}>
            <Button type="secondary" size="medium" onClick={(e) => onCancel(e)}>
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
