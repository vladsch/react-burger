import styles from './orders-tape.module.css';
import OrderTapeCard from '../order-tape-card/order-tape-card';
import { Link, useLocation } from "react-router-dom";
import { IOrdersTapeProps } from "../../definitions/components/IOrdersTapeProps";

const OrdersTape = ({ orders, originalIngredients }: IOrdersTapeProps): JSX.Element => {
  const location = useLocation();

  return (
    <div className={ styles.container }>
      <div className={ `pr-2 ${ styles.orderListWrapper }` }>
        { originalIngredients.length > 0 && orders && orders.sort((a, b) => b.number - a.number).map((item, index) =>
          item.ingredients && item.ingredients.length &&
          (<div key={ item._id } className={ index !== orders.length - 1 ? 'mb-4' : '' }>
              <Link className={ `${ styles.link }` }
                    to={ { pathname: location.pathname + '/' + item._id, state: { page: location }, } }>
                <OrderTapeCard order={ item } originalIngredients={ originalIngredients }/>
              </Link>
          </div>)
        ) }
      </div>
    </div>
  );
}

export default OrdersTape;