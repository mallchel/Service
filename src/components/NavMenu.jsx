import React from 'react';
import cn from 'classnames';

import styles from './NavMenu.module.less';

const NavMenu = ({ service, order, date }) => {
  return <ul className={styles.menu}>
    <li className={cn(styles.item, {
      [styles.linkSelected]: service,
      [styles.linkDone]: order || date,
    })}>Услуги</li>
    <li className={cn(styles.item, {
      [styles.linkSelected]: order,
      [styles.linkDone]: date
    })}>Заказ</li>
    <li className={cn(styles.item, { [styles.linkSelected]: date })}>Дата и время</li>
  </ul>
}

export default NavMenu;
