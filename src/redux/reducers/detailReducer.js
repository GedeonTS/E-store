import { GET_DETAILS } from '../actionsType';

const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DETAILS: {
      return action.details;
    } default:
      return state;
  }
};

export default detailsReducer;
