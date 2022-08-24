import styles from './ingredient-icon.module.css';
import { IIngredientIconProps } from "../../definitions/components/IIngredientIconProps";

const IngredientIcon = ({ name, image_mobile, count }: IIngredientIconProps): JSX.Element => {
  return (
    <div className={ styles.container }>
      <img className={ styles.image } src={ image_mobile } alt={ name }/>
      { count && count > 1 && <div className={ `text text_type_main-default ${ styles.overlay }` }>+{ count }</div> }
    </div>
  );
};

export default IngredientIcon;