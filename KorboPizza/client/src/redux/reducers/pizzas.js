const initialState = {
    items: [],
    page: 1,
    totalCount: 0,
    limit: 4,
    isLoaded: false,
};

const pizzas = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PIZZAS':
            return {
                ...state,
                items: [...action.payload.items],
                totalCount: action.payload.totalCount,
                page: action.payload.page,
                limit: action.payload.limit,
                isLoaded: true,
            };
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload,
            };
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload,
                isLoaded: action.payload,
            };
        default:
            return state;
    }
};

export default pizzas;
