import {combineReducers} from 'redux';

import filters from './filters';
import pizzas from './pizzas';
import authorize from './authorize';
import cart from './cart';
import currency from "./currency";

const rootReducer = combineReducers({
    filters,
    pizzas,
    authorize,
    cart,
    currency
});

export default rootReducer;
