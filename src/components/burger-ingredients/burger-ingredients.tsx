import React, {useRef} from 'react';
import styles from './burger-ingredients.module.css';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import {setActiveTab} from '../../services/actions/ingredientsActions';
import {getViewTab} from "../../utils/helpers";
import {INGREDIENT_TYPE} from "../../definitions/enums/IngredientType";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {Tab} from "../../definitions/overrides/Tab";

function BurgerIngredients(): JSX.Element {
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

    const dispatch = useAppDispatch();
    const activeTab = useAppSelector(store => store.ingredients.activeTab);
    const scrollRef = useRef<HTMLDivElement>(null);

    const onScroll = () => dispatch(setActiveTab(getViewTab(scrollRef.current) ?? INGREDIENT_TYPE.BUN));
    const setAndScrollActive = (value: INGREDIENT_TYPE) => {
        const group = scrollRef.current?.querySelector(`div.group[data-group=${value}]`)
        group?.scrollIntoView({
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
                    {tabs.map((tab) => (
                        <Tab value={tab.value}
                             active={tab.value === activeTab}
                             key={tab.value}
                             onClick={() => setAndScrollActive(tab.value)}>
                            {tab.text}
                        </Tab>
                    ))}
                </section>
                <section className={`${styles.groups} mt-10`} ref={scrollRef} onScroll={onScroll}>
                    {tabs.map((tab) => (
                        <IngredientsGroup group={tab.value} key={tab.value} name={tab.text} />
                    ))}
                </section>
            </div>
        </>
    );
}

export default BurgerIngredients;
