import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducers';
import detailsReducer from './reducers/detailReducer';
import cartReducer from './reducers/cartReducer';
import currencyReducer from './reducers/currencyReducer';

const rootReducer = combineReducers({
  dataReducer,
  detailsReducer,
  cartReducer,
  currencyReducer,

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
