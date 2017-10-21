function calcPrice(items) {
  let price = 0;
  items.forEach(item => {
    price += item.totals;
  });
  return price;
}

const cart = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'SETTOCART':
      const index = state.items.findIndex((item) => item.id === action.item.id);

      if (index !== -1) {
        state.items[index] = action.item;
        return { ...state, price: calcPrice(state.items) };
      } else {
        state.items.push(action.item);
        return { ...state, price: calcPrice(state.items) };
      }
    case 'DELETEFROMCART':
      state.items = state.items.filter((item) => item.id !== action.item.id);
      return { ...state, price: calcPrice(state.items) };
    case 'SETDATETOCART':
      return { ...state, date: action.date };
    default:
      return state;
  }
}

export default cart;
