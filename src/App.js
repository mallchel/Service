import React, { Component } from 'react';
import { connect } from 'react-redux';

//actions
import { fetchServices, setToCart, setDateToCart, deleteFromCart } from './actions';

import NavMenu from './components/NavMenu';
import List from './components/List';
import Service from './components/Service';
import Cart from './components/Cart';
import Date from './components/Date';
import Order from './components/Order';

//modules
import styles from './App.module.less';

class App extends Component {
  state = {
    currentCategory: null,
    currentService: null,
    cartVisible: false,
    dateVisible: false,
    orderVisible: false,
  }

  componentDidMount() {
    this.props.dispatch(fetchServices());
  }

  onItemClick = (item) => {
    if (item.children.length) {
      this.setState({
        currentCategory: item
      })
    } else {
      this.setState({
        currentService: item
      })
    }
  }

  toCart = (item) => {
    this.props.dispatch(setToCart(item));
    this.setState({
      cartVisible: true
    });
  }

  toRoot = () => {
    this.setState({
      orderVisible: false,
      currentService: null,
      currentCategory: null,
    })
  }

  addService = () => {
    this.setState({
      cartVisible: false,
      currentService: null,
      currentCategory: null,
    })
  }

  changeService = (item) => {
    this.setState({
      currentService: item,
      cartVisible: false,
    })
  }

  deleteService = (item) => {
    this.props.dispatch(deleteFromCart(item));
  }

  selectDate = () => {
    this.setState({
      dateVisible: true,
      cartVisible: false,
    })
  }

  toOrder = (date) => {
    this.props.dispatch(setDateToCart(date));
    this.setState({
      dateVisible: false,
      orderVisible: true,
    })
  }

  render() {
    const { categories, failedRequest, cart } = this.props;
    const { orderVisible, dateVisible, cartVisible, currentService, currentCategory } = this.state;

    return (
      <div>
        <header className={styles.header}>
        </header>
        <main className={styles.main}>
          {!orderVisible && <NavMenu
            service={!orderVisible && !dateVisible && !cartVisible}
            order={cartVisible}
            date={dateVisible}
          />}
          {
            failedRequest ?
              'Ошибка загрузки данных.'
              :
              categories ?
                orderVisible ?
                  <Order order={cart} title={categories.name} toRoot={this.toRoot} />
                  :
                  dateVisible ?
                    <Date
                      title={categories.name}
                      order={cart}
                      toOrder={this.toOrder}
                    />
                    :
                    cartVisible ?
                      <Cart
                        title={categories.title}
                        cart={cart}
                        addService={this.addService}
                        teaser={categories.teaser_card}
                        changeService={this.changeService}
                        deleteService={this.deleteService}
                        selectDate={this.selectDate}
                      />
                      :
                      currentService ?
                        <Service item={currentService} toCart={this.toCart} />
                        :
                        currentCategory ?
                          <div>
                            <h1>{currentCategory.title}</h1>
                            <List withPrice items={currentCategory.children} onClick={this.onItemClick} />
                          </div>
                          :
                          <div>
                            <h1>{categories.title}</h1>
                            <p className={styles.teaser}>{categories.teaser_card}</p>
                            <List items={categories.children} onClick={this.onItemClick} />
                          </div>
                :
                'Загрузка...'
          }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.services.categories,
    failedRequest: state.services.failed,
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(App);
