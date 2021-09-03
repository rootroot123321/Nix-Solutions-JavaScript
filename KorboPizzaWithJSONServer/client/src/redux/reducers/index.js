import {combineReducers} from 'redux';

import filters from './filters';
import pizzas from './pizzas';
import cart from './cart';
import currency from "./currency";

const rootReducer = combineReducers({
    filters,
    pizzas,
    cart,
    currency
});

export default rootReducer;
