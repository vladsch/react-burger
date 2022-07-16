import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import {useSelector} from "react-redux";

function IngredientsGroup({name, group}) {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const items = ingredients.filter((item) => item.type === group);

    return (
        <>
            {
                items && (
                    <div className='group' group={group}>
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

IngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired
};

export default IngredientsGroup;