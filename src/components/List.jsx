import React from 'react';
import styles from './List.module.less';

const List = ({ items, withPrice, onClick }) => {
  return <ul className={styles.menu}>
    {
      items.map((item, i) => {
        return <li
          key={i}
          onClick={() => onClick(item)}
          className={styles.itemContainer}
        >
          {
            item.teaser_card ?
              <div>
                <div className={styles.itemText}>{item.name}</div>
                <span className={styles.teaser}>{item.teaser_card}</span>
              </div>
              :
              <div className={styles.itemText}>{item.name}</div>
          }
          {
            withPrice && item.data ?
              item.data.tarif ?
                <span>{item.data.tarif}&nbsp;&#8381;</span>
                :
                <span>Бесплатно</span>
              :
              null
          }
        </li>
      })
    }
  </ul>
}

export default List;
