const initialState = {
    activeCategory: null,
    categories: [],
    sortBy: {
        type: 'price',
        order: 'desc',
    },
};

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.payload,
            };
        case 'SET_ACTIVE_CATEGORY':
            return {
                ...state,
                activeCategory: action.payload,
            };
        case 'SET_CATEGORIES':
            const newCategories = action.payload.map(item => item.name);
            return {
                ...state,
                categories: [...newCategories],
            };
        case 'CREATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.push(action.payload)
            };
        default:
            return state;
    }
};

export default filters;
