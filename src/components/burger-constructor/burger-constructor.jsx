import React from 'react';
import styles from './burger-constructor.module.css';
import {
    ConstructorElement,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import MakeOrder from "../make-order/make-order";
import {ingredients} from '../../utils/ingredients';

class BurgerConstructor extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            bun: null,
            toppings: null
        };
    }

    componentDidMount() {
        this.setState({
            bun: ingredients.find(item => item.type === 'bun'),
            toppings: ingredients.filter(item => item.type !== 'bun')
        });
    }

    render() {
        return (
           <div className={styles.list}>
               {this.state.bun && (
                   <section className={`mb-4 pr-2`}>
                       <ConstructorElement
                           type='top'
                           thumbnail={this.state.bun.image_mobile}
                           text={`${this.state.bun.name} (верх)`}
                           price={this.state.bun.price}
                           isLocked={true}
                       />
                   </section>
               )}

               {this.state.toppings && (
                   <section className={'ml-1'}>
                       <ul className={styles.toppings}>
                           {this.state.toppings.map((ingredient) => (
                               <li className={`${styles.topping} pr-2 mb-2`} key={ingredient._id}>
                                   <span className={styles.dragIcon}>
                                       <DragIcon type='primary' />
                                   </span>
                                   <ConstructorElement
                                       thumbnail={ingredient.image_mobile}
                                       text={ingredient.name}
                                       price={ingredient.price}
                                       isLocked={false}
                                   />
                               </li>
                           ))}
                       </ul>
                   </section>
               )}

               {this.state.bun && (
                   <section className={`mb-4 pr-2`}>
                       <ConstructorElement
                           type='bottom'
                           thumbnail={this.state.bun.image_mobile}
                           text={`${this.state.bun.name} (низ)`}
                           price={this.state.bun.price}
                           isLocked={true}
                       />
                   </section>
               )}

               <MakeOrder total={610} />
           </div>
        );
    }
}

export default BurgerConstructor;