import React, {useRef} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from 'react-redux';
import { closeDetails, setActiveTab } from '../../services/actions/ingredientsActions';
import {getViewTab} from "../../utils/helpers";
import {INGREDIENT_TYPE} from "../../utils/consts";

function BurgerIngredients() {
    const tabs = [
        {
            value: INGREDIENT_TYPE.BUN,
            text: 'Булки'
        },
        {
            value: INGREDIENT_TYPE.SAUCE,
            text: 'Соусы'
        },
        {
            value: INGREDIENT_TYPE.MAIN,
            text: 'Начинки'
        },
    ];

    const dispatch = useDispatch();
    const detailsData = useSelector(store => store.ingredients.detailsData);
    const activeTab = useSelector(store => store.ingredients.activeTab);
    const scrollRef = useRef(null);

    const onCloseClick = () => {
        dispatch(closeDetails());
    };

    const onScroll = () => dispatch(setActiveTab(getViewTab(scrollRef.current)));
    const setAndScrollActive = (value) => {
        const group = scrollRef.current.querySelector(`div.group[group=${value}]`)
        group.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
        dispatch(setActiveTab(value));
    };

    return (
        <>
            <div className={`${styles.container} p-2`}>
                <section className={styles.header}>
                    {tabs.map((tab, index) => (
                        <Tab value={tab.value}
                             active={tab.value === activeTab}
                             key={tab.value}
                             onClick={() => setAndScrollActive(tab.value)}>
                            {tab.text}
                        </Tab>
                    ))}
                </section>
                <section className={`${styles.groups} mt-10`} ref={scrollRef} onScroll={onScroll}>
                    {tabs.map((tab, index) => (
                        <IngredientsGroup group={tab.value} key={tab.value} name={tab.text} />
                    ))}
                </section>
            </div>
            {detailsData && (
                <Modal onClose={onCloseClick} title={'Детали ингредиента'}>
                    <IngredientDetails ingredient={detailsData} />
                </Modal>
            )}
        </>
    );
};

export default BurgerIngredients;
