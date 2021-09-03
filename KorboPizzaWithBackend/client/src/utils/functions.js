export function calcPrice(price, currency) {
    switch(currency) {
        case '₽':
            return Math.round(price * 2.7);
        case '$':
            return Math.round(price * 0.037);
        case '€':
            return  Math.round(price * 0.031);
        default:
            return price;
    }
}