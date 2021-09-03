const currency = (state = '₴', action) => {
    switch(action.type) {
        case 'SET_CURRENCY':
            return action.payload;
        default:
            return state;
    }
};

export default currency;