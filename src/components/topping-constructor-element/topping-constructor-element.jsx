import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import styles from "./topping-constructor-element.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient, reorderIngredient} from "../../services/actions/orderActions";
import BURGER_PROP_TYPES from "../../utils/propTypes";
import PropTypes from 'prop-types';
import {useDrop, useDrag} from "react-dnd";
import {DRAG_TYPES} from "../../utils/consts";

function ToppingConstructorElement({ingredient, index}) {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(removeIngredient(index));
    };

    const reorder = (from, to) => {
        dispatch(reorderIngredient(from, to));
    };

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: DRAG_TYPES.FROM_CONSTRUCTOR,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const from = item.index;
            const to = index;
            if (from === to) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (from < to && hoverClientY < hoverMiddleY) {
                return;
            }
            if (from > to && hoverClientY > hoverMiddleY) {
                return;
            }
            reorder(from, to);
            item.index = to;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: DRAG_TYPES.FROM_CONSTRUCTOR,
        item: () => {
            return { index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.1 : 1;
    drag(drop(ref));

    return (
        <li className={`${styles.topping} pr-2 mb-2`}
            ref={ref}
            data-handler-id={handlerId}
            style={{ opacity }}>
            <span className={styles.dragIcon}>
               <DragIcon type='primary' />
            </span>
            <ConstructorElement
                thumbnail={ingredient.image_mobile}
                text={ingredient.name}
                price={ingredient.price}
                isLocked={false}
                handleClose={handleClose}
            />
        </li>
    );
};

ToppingConstructorElement.propTypes = {
    ingredient: BURGER_PROP_TYPES.ingredient.isRequired,
    index: PropTypes.number.isRequired,
};

export default ToppingConstructorElement;