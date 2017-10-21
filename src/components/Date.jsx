import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'moment/locale/ru';

import styles from './Date.module.less';

moment.locale('ru');
const minDate = moment().add(1, 'days').minute(0);
const maxDate = moment.max(moment(minDate).add(30, 'days'));

export default class SelectDate extends React.Component {
  state = {
    currentDate: moment().add(1, 'days').minute(0),
  }

  onClick = () => {
    this.props.toOrder(this.state.currentDate);
  }

  onChangeDate = (value) => {
    if (value >= minDate) {
      let newDate = this.state.currentDate
        .set('year', value.get('year'))
        .set('month', value.get('month'))
        .set('date', value.get('date'));

      this.setState({
        currentDate: newDate
      })
    }
  }

  onChangeTime = (value) => {
    if (value > minDate && value.get('hour') >= 9 && value.get('hour') <= 18) {
      this.setState({
        currentDate: value
      });
    }
  }

  render() {
    let _title;
    const { order, title } = this.props;

    if (order.items.length === 1) {
      _title = order.items[0].name;
    }

    return <div>
      <h1>{_title || `${title}, ${order.items.length} услуги`}</h1>
      <div className={styles.priceContainer}>{order.price}&nbsp;&#8381;</div>
      <div className={styles.selectTitle}>Выберите удобный день и время</div>
      <div className={styles.selectContainer}>
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          value={moment(this.state.currentDate).format('LL')}
          selected={this.state.currentDate}
          onChange={this.onChangeDate}
          className={styles.datePicker}
        />
        <TimePicker
          showSecond={false}
          showMinute={false}
          format={'HH:mm'}
          value={this.state.currentDate}
          className={styles.timePicker}
          onChange={this.onChangeTime}
          use12Hours={false}
        />
      </div>
      <button className={styles.button} onClick={this.onClick}>Заказать</button>
    </div>
  }
}
