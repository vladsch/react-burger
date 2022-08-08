import styles from "./preloader.module.css";
import loaderImage from "../../images/loader.svg";

export default function  PreLoader() {
  return (
    <div className={styles.mask}>
      <img className={styles.loader} src={loaderImage} alt="Загрузка..." />
    </div>
  );
};
