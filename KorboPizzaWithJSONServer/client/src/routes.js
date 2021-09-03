import {CART_ROUTE, HOME_ROUTE} from "./utils/constants";
import {Cart, Home} from "./pages";

export const routes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
];