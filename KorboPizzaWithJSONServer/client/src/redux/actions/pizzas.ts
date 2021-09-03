import axios from 'axios';
import {SortPopup} from "./index";
import {Pizza} from "./index";

export const setLoaded = (payload: boolean) => ({
    type: 'SET_LOADED',
    payload,
});

export const fetchPizzas = (sortBy: (SortPopup), category: (number|null), page, limit) => (dispatch: any) => {
    dispatch({
        type: 'SET_LOADED',
        payload: false,
    });
    page = page || 1;
    limit = limit || 9;
    if(category == null) {
        axios.get(`/pizzas?_sort=${sortBy.type}&_order=${sortBy.order}&_limit=${limit}&_page=${page}`)
            .then(({data}) => {
                dispatch(setPizzas(data, page, 4, 9));
            });
    }
    else {
        axios.get(`/pizzas?category=${category}&_sort=${sortBy.type}&_order=${sortBy.order}&_limit=${limit}&_page=${page}`)
            .then(({data}) => {
                let totalCount = data.length;
                if(totalCount === 0) {
                    setPage(1);
                    axios.get(`/pizzas?category=${category}&_sort=${sortBy.type}&_order=${sortBy.order}&_limit=${limit}&_page=${1}`)
                        .then(({data}) => {
                            let totalCount = data.length;
                            dispatch(setPizzas(data, page, limit, totalCount))
                        });
                }
                else dispatch(setPizzas(data, page, limit, totalCount));
            });
    }
};

export const setPizzas = (items: Pizza, page, limit, totalCount) => ({
    type: 'SET_PIZZAS',
    payload: {items, page, limit, totalCount}
});

export const setPage = (page: number) => ({
    type: 'SET_PAGE',
    payload: page
})
