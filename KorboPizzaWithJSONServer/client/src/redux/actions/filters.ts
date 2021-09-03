import {SortPopup as SortPopupObject} from "./index";

export const setSortBy = ({type, order} : SortPopupObject) => ({
    type: 'SET_SORT_BY',
    payload: {type, order},
});

export const setActiveCategory = (catIndex: number) => ({
    type: 'SET_ACTIVE_CATEGORY',
    payload: catIndex,
});