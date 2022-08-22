import styles from './ingredient-icon-list.module.css';
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {IIngredientIconListProps} from "../../definitions/components/IIngredientIconListProps";
import {IIngredient} from "../../definitions/models/IIngredient";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";

const IngredientIconList = ({ ingredients }: IIngredientIconListProps): JSX.Element => {
  const uniqueIngredients = new Map<string, Array<IIngredient>>();
  const bun: IIngredient | undefined = ingredients.find(item => item.type === INGREDIENT_TYPE.BUN);
  const maxIngredientIconIndex: number = 50;

  ingredients.forEach(item => {
    if (item.type !== INGREDIENT_TYPE.BUN) {
      const value: Array<IIngredient> = uniqueIngredients.has(item._id) ? [...uniqueIngredients.get(item._id) as Array<IIngredient>, item] : [item];
      uniqueIngredients.set(item._id, value);
    }
  });

  return (<div className={ styles.container }>
    { bun && (<div style={ { zIndex: maxIngredientIconIndex } }>
                <IngredientIcon image_mobile={ bun.image_mobile } name={ bun.name } count={ 1 }/>
              </div>) }

    { Array.from(uniqueIngredients.values()).sort((a, b) => a.length - b.length).slice(0, 7).map((value, index) =>
      (<div key={ value[0]._id } className={ styles.listElement } style={ { zIndex: maxIngredientIconIndex - index - 1 } }>
        <IngredientIcon image_mobile={ value[0].image_mobile } name={ value[0].name } count={ value.length }/>
      </div>)
    ) }
  </div>)
}

export default IngredientIconList;