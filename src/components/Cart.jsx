import React from 'react';

import styles from './Cart.module.less'

const Cart = ({ title, cart, teaser, addService, changeService, deleteService, selectDate }) => {
  return <div>
    <h1>{title}</h1>
    <ul className={styles.menu}>
      {
        cart.items.map((item, i) => {
          return <li key={i} className={styles.itemContainer}>
            <div className={styles.itemText} onClick={() => changeService(item)}>{item.name}</div>
            <span className={styles.itemPrice}>{item.totals}&nbsp;&#8381;</span>
            <img src="img/trach.svg" alt="Удалить" onClick={() => deleteService(item)} className={styles.trach} />
          </li>
        })
      }
    </ul>
    <div className={styles.addService} onClick={addService}>+ Добавить еще одну услугу</div>
    <div className={styles.priceContainer}>{cart.price}&nbsp;&#8381;</div>
    <button className={styles.button} onClick={selectDate}>К выбору даты и времени</button>
  </div>
}

export default Cart;
