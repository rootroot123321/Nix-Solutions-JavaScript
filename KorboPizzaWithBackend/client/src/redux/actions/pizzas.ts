import {Pizza} from "./index";

export const setLoaded = (payload: boolean) => ({
    type: 'SET_LOADED',
    payload,
});

export const setPizzas = (items: Pizza, page, limit, totalCount) => ({
    type: 'SET_PIZZAS',
    payload: {items, page, limit, totalCount},
});

export const setPage = (page: number) => ({
    type: 'SET_PAGE',
    payload: page
})
