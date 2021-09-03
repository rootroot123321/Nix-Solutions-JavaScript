import {SortPopup as SortPopupObject} from "./index";

export const setSortBy = ({type, order} : SortPopupObject) => ({
    type: 'SET_SORT_BY',
    payload: {type, order},
});

export const setActiveCategory = (catIndex: number) => ({
    type: 'SET_ACTIVE_CATEGORY',
    payload: catIndex,
});

export const setCategories = (categories: any) => ({
    type: 'SET_CATEGORIES',
    payload: categories,
});

export const createCategory = (name: string) => ({
    type: 'CREATE_CATEGORY',
    payload: name,
});
