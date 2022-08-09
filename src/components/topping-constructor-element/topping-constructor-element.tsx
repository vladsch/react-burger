import React, {useRef} from 'react';
import styles from "./topping-constructor-element.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient, reorderIngredient} from "../../services/actions/orderActions";
import {useDrop, useDrag} from "react-dnd";
import {Identifier} from "dnd-core";
import {DRAG_TYPES} from "../../definitions/enums/DragTypes";
import {useAppDispatch} from "../../services/store";
import {IToppingConstructorElementProps} from "../../definitions/components/IToppingConstructorElementProps";
import {IReorderItem} from "../../definitions/components/IReorderItem";

function ToppingConstructorElement({ingredient, index}: IToppingConstructorElementProps) {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(removeIngredient(index));
    };

    const reorder = (from, to) => {
        dispatch(reorderIngredient(from, to));
    };

    const ref = useRef<HTMLLIElement>(null);

    const [{ handlerId }, drop] = useDrop<IReorderItem, null, {handlerId: Identifier | null}>({
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

            if (!clientOffset) {
                return;
            }

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
}

export default ToppingConstructorElement;