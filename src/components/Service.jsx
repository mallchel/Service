import React from 'react';

import styles from './Service.module.less';

export default class Service extends React.Component {
  state = {
    count: this.props.item.count || 1
  }

  decrement = () => {
    if (this.state.count > 1) {
      this.setState(({ count }) => {
        return {
          count: --count
        }
      })
    }
  }

  increment = () => {
    this.setState(({ count }) => {
      return {
        count: ++count
      };
    })
  }

  render() {
    const {
      item: {
        data: { tarif }, name
     },
      toCart } = this.props;

    return <div>
      <h1>{name}</h1>
      {
        tarif ?
          <div className={styles.priceContainer}>{tarif * this.state.count}&nbsp;&#8381;</div>
          :
          <div className={styles.priceContainer}>Бесплатно</div>
      }
      {
        tarif && <div className={styles.control}>
          <div>
            <button className={styles.decrement} onClick={this.decrement}><div className={styles.minus} /></button>
            <button className={styles.increment} onClick={this.increment}><div className={styles.plus} /></button>
          </div>
          <div>{`${this.state.count} x ${tarif}`}&nbsp;&#8381;</div>
        </div>
      }
      <button className={styles.addOrder} onClick={() => toCart({
        ...this.props.item,
        count: this.state.count,
        totals: tarif * this.state.count
      })}>Добавить к заказу</button>
    </div>
  }
}
