import {CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/constants";
import {Cart, Home, Auth} from "./pages";

export const authRoutes = [
    {
        path: CART_ROUTE,
        Component: Cart
    }
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
];