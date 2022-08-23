import React, {useMemo} from 'react';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import {useAppSelector} from "../../services/store";
import {IIngredientsGroupProps} from "../../definitions/components/IIngredientsGroupProps";

function IngredientsGroup({name, group}: IIngredientsGroupProps): JSX.Element {
    const ingredients = useAppSelector(store => store.ingredients.ingredients);
    const items = useMemo(() => ingredients.filter((item) => item.type === group), [ingredients, group]);

    return (
        <>
            {
                items && (
                    <div className='group' data-group={group}>
                        <h2 className={`${styles.header} text text_type_main-medium pb-5 pt-5`}>
                            {name}
                        </h2>
                        <ul className={`${styles.body}`}>
                            {items.map(item => (
                                <Ingredient data={item} key={item._id} />
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    );
};

export default IngredientsGroup;