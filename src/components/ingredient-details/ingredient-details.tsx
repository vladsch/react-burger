import React, {useMemo} from 'react';
import styles from './ingredient-details.module.css';
import {useParams} from "react-router-dom";
import {IIngredientDetailsParams} from "../../definitions/components/IIngredientDetailsParams";
import {useAppSelector} from "../../services/store";

function IngredientDetails() {
    const composition =[{
        name: 'Калории, ккал',
        key: 'calories'
    }, {
        name: 'Белки, г',
        key: 'proteins'
    }, {
        name: 'Жиры, г',
        key: 'fat'
    }, {
        name: 'Углеводы, г',
        key: 'carbohydrates'
    }];

    const { id } = useParams<IIngredientDetailsParams>();
    const ingredients = useAppSelector((store) => store.ingredients.ingredients);
    const ingredient = useMemo(() => {
        return ingredients.find((ingredient) => ingredient._id === id);
    }, [ingredients, id]);

    return (
        ingredient ? (
                <div className={styles.container}>
                    <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
                    <p className={`${styles.title} text text_type_main-medium pb-3`}>
                        {ingredient.name}
                    </p>
                    <ul className={styles.composition}>
                        {
                            composition.map((item, index) => (
                                <li key={index}>
                                    <p className='text text_type_main-default text_color_inactive pb-1'>
                                        {item.name}
                                    </p>
                                    <p className={`${styles.amount} text text_type_digits-default text_color_inactive`}>
                                        {ingredient[item.key]}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ) : (
               <p>{`Ингредиент с идентификатором ${id} не найден`}</p>
            )
    );
}

export default IngredientDetails;