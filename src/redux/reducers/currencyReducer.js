import { CHANGE_CURRENCY } from '../actionsType';

const initialialize = { level: 0 };

const currencyReducer = (state = initialialize, action = { type: '' }) => {
  switch (action.type) {
    case CHANGE_CURRENCY: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default currencyReducer;
