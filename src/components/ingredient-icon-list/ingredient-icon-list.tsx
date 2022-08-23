import styles from './ingredient-icon-list.module.css';
import IngredientIcon from "../ingredient-icon/ingredient-icon";
import {IIngredientIconListProps} from "../../definitions/components/IIngredientIconListProps";
import {IIngredient} from "../../definitions/models/IIngredient";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";
import {useMemo} from "react";

const IngredientIconList = ({ ingredients }: IIngredientIconListProps): JSX.Element => {
  const bun: IIngredient | undefined = useMemo(() => ingredients.find(item => item.type === INGREDIENT_TYPE.BUN), [ingredients]);
  const maxIngredientIconIndex: number = 50;

  const uniqueIngredients = useMemo(() => {
    const map = new Map<string, Array<IIngredient>>();
    ingredients.forEach(item => {
      if (item.type !== INGREDIENT_TYPE.BUN) {
        const value: Array<IIngredient> = map.has(item._id) ? [...map.get(item._id) as Array<IIngredient>, item] : [item];
        map.set(item._id, value);
      }
    });
    return map;
  }, [ingredients]);

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