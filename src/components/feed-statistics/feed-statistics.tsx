import styles from './feed-statistics.module.css';
import {IFeedStatisticsProps} from "../../definitions/components/IFeedStatisticsProps";
import {ORDER_STATUS} from "../../definitions/enums/OrderStatus";

const FeedStatistics = ({ orders, total, totalToday }: IFeedStatisticsProps): JSX.Element => {
  return (
    <div className={ styles.container }>
      <div className={ styles.currentOrders }>
        <div className={ styles.orders }>
          <p className="pb-6 text text_type_main-medium">Готовы:</p>
          { orders.filter(order => order.status === ORDER_STATUS.DONE).slice(0, 9).map(doneOrder =>
              (<p key={doneOrder._id} className={ `pb-2 text text_type_digits-default ${ styles.readyOrder }` }>{ doneOrder.number }</p>)
          )}
        </div>
        <div className="pl-9"/>
        <div className={ styles.orders }>
          <p className="pb-6 text text_type_main-medium">В работе:</p>
          { orders.filter(order => order.status === ORDER_STATUS.PENDING).slice(0, 9).map(createdOrder =>
            (<p key={createdOrder._id} className="pb-2 text text_type_digits-default">{ createdOrder.number }</p>)
          )}
        </div>
      </div>
      <div className={ `mt-15` }>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={ `text text_type_digits-large ${ styles.textShadow }` }>{total}</p>
      </div>
      <div className={ `mt-15` }>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={ `text text_type_digits-large ${ styles.textShadow }` }>{totalToday}</p>
      </div>
    </div>
  );
}

export default FeedStatistics;