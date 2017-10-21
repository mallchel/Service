import React from 'react';
import moment from 'moment';

import styles from './Order.module.less';

const Order = ({ order, title, toRoot }) => {
  let _title;

  if (order.items.length === 1) {
    _title = order.items[0].name;
  }

  return <div className={styles.orderContainer}>
    <img src="img/icon.svg" alt="Готово" />
    <h1 className={styles.title}>
      {_title || `${title}, ${order.items.length} услуги`}<br />
      {moment(order.date).format('DD MMMM')} в {moment(order.date).format('LT')}
    </h1>
    <p>Заказ оформлен. При необходимости, диспетчер свяжется с вами для уточнения</p>
    <button className={styles.button} onClick={toRoot}>Мои заказы</button>
  </div>
}

export default Order;
