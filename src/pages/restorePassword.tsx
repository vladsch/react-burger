import React, {ChangeEvent, FormEvent, useEffect} from "react";
import pagesStyles from "./pages.module.css";
import {Link, useHistory, useLocation} from "react-router-dom";
import {askToResetPassword} from "../services/actions/authActions";
import { History, LocationState } from "history";
import {ILocationState} from "../definitions/ILocationState";
import {useAppDispatch, useAppSelector} from "../services/store";
import {Button} from "../definitions/overrides/Button";
import {EmailInput} from "../definitions/overrides/EmailInput";

export default function RestorePasswordPage() {
  const history: History<LocationState> = useHistory();
  const location: LocationState & ILocationState = useLocation();
  const dispatch = useAppDispatch();
  const {isAuthorized, email: emailed} = useAppSelector((store) => store.auth);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState('');

  const onChange = (setter: (value: string) => void, e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError('');
  };

  useEffect(() => {
    if (isAuthorized) {
      history.replace(location?.state?.from || '/');
    }

    if (!isAuthorized && emailed)
      history.push("/forgot-password/reset", 'forgot-password');
  }, [isAuthorized, emailed, history, location?.state?.from]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Введите свой email');
      return;
    }

    const invalidField = (e.target as HTMLFormElement).querySelector('.input_status_error');
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
