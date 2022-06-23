import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-group.module.css';
import Ingredient from '../ingredient/ingredient';
import BURGER_PROP_TYPES from "../../utils/propTypes";

function IngredientsGroup({name, group, items}) {
    return (
        <>
            {
                items && (
                    <>
                        <h2 className={`${styles.header} text text_type_main-medium pb-5 pt-5`}>
                            {name}
                        </h2>
                        <ul className={styles.body}>
                            {items.map(item => (
                                <Ingredient data={item} count={1} key={item._id} />
                            ))}
                        </ul>
                    </>
                )
            }
        </>
    );
};

IngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(BURGER_PROP_TYPES.ingredient).isRequired
};

export default IngredientsGroup;