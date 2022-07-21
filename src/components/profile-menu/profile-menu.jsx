import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/authActions";
import styles from "./profile-menu.module.css";

export default function ProfileMenu () {
  const dispatch = useDispatch();
  const linkCls = `${styles.link} text text_type_main-medium text_color_inactive`;
  const activeLinkCls = `${styles.link} ${styles.active} text text_type_main-medium`;

  return (
    <div className={styles.menu}>
      <NavLink to="/profile" exact
               activeClassName={activeLinkCls}
               className={linkCls}>
        Профиль
      </NavLink>

      <NavLink to="/profile/orders" exact
               activeClassName={activeLinkCls}
               className={linkCls}>
        История заказов
      </NavLink>

      <NavLink to={'/'} onClick={(e) => {
          e.preventDefault();
          dispatch(logout());
      }} className={linkCls}>
        Выход
      </NavLink>

      <p className={`${styles.info} text text_type_main-default mt-20`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};
