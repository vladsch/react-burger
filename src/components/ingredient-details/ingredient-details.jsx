import React from 'react';
import styles from './ingredient-details.module.css';
import BURGER_PROP_TYPES from "../../utils/propTypes";

function IngredientDetails({ingredient}) {
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

    return (
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
    );
};

IngredientDetails.propTypes = {
    ingredient: BURGER_PROP_TYPES.ingredient.isRequired
}

export default IngredientDetails;