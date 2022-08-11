import { INCREMENT_CART_ITEM, GET_CART_ITEM, CHANGE_CART_IMAGE } from '../actionsType';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_ITEM: {
      const foundDuplicate = state.filter((item) => item.id === action.cartItem.id
        && item.colorSelected === action.cartItem.colorSelected
        && item.sizeSelected === action.cartItem.sizeSelected
        && item.capacitySelected === action.cartItem.capacitySelected
        && item.portSelected === action.cartItem.portSelected
        && item.touchSelected === action.cartItem.touchSelected);
      if (foundDuplicate.length > 0) {
        let cartIfDuplicate = [];
        state.forEach((item) => {
          if (item.id === action.cartItem.id
            && item.colorSelected === action.cartItem.colorSelected
            && item.sizeSelected === action.cartItem.sizeSelected
            && item.capacitySelected === action.cartItem.capacitySelected
            && item.portSelected === action.cartItem.portSelected
            && item.touchSelected === action.cartItem.touchSelected
          ) {
            item.numberOfItems += 1;
          }
          cartIfDuplicate = [...cartIfDuplicate, item];
          localStorage.setItem('bag', JSON.stringify(cartIfDuplicate));
          return cartIfDuplicate;
        });
      } else {
        const objToAdd = { ...action.cartItem, numberOfItems: 1, shownImg: 0 };
        const newState = [...state, objToAdd];
        localStorage.setItem('bag', JSON.stringify(newState));
        return newState;
      }
    }
      break;
    case INCREMENT_CART_ITEM: {
      let newState = [];
      state.forEach((item) => {
        if (item === action.payload.item) {
          if (action.payload.btn === '+') {
            item.numberOfItems += 1;
          } else if (action.payload.btn === '-') {
            if (item.numberOfItems === 0) {
              item.numberOfItems += 0;
            } else {
              item.numberOfItems -= 1;
            }
          }
        }
        newState = [...newState, item];
      });
      const newState2 = newState.filter((item) => item.numberOfItems !== 0);
      localStorage.setItem('bag', JSON.stringify(newState2));
      return newState2;
    } case CHANGE_CART_IMAGE: {
      let newState = [];
      state.forEach((item) => {
        if (item === action.payload.item) {
          if (action.payload.btn === '+') {
            if (item.shownImg < item.gallery.length - 1) {
              item.shownImg += 1;
            }
          } else if (action.payload.btn === '-') {
            if (item.shownImg > 0) {
              item.shownImg -= 1;
            }
          }
        }
        newState = [...newState, item];
      });
      return newState;
    } default: {
      if (JSON.parse(localStorage.getItem('bag'))) {
        return JSON.parse(localStorage.getItem('bag'));
      }
      return state;
    }
  }
};

export const incrementItem = (item, btn) => (dispatch) => {
  dispatch({
    type: INCREMENT_CART_ITEM,
    payload: { item, btn },
  });
};

export const getCartItem = (cartItem) => (dispatch) => {
  dispatch({
    type: GET_CART_ITEM,
    cartItem,
  });
};

export const changeCartImage = (item, btn) => (dispatch) => {
  dispatch({
    type: CHANGE_CART_IMAGE,
    payload: { item, btn },
  });
};

export default cartReducer;
