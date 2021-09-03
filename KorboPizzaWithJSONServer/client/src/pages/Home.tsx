import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from '../components';
import {setSortBy, setActiveCategory} from '../redux/actions/filters';
import {addPizzaToCart} from "../redux/actions/cart";
import {fetchPizzas} from "../redux/actions/pizzas";
import {Pages} from "../components/index";

const categoryNames = ['Мясные', 'Вегетарианская', 'Ассорти', 'Экзотические', 'Закрытые'];

const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавит', type: 'name', order: 'asc'},
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}: any) => pizzas.items);
    const cartItems = useSelector(({cart}: any) => cart.items);
    const isLoaded = useSelector(({pizzas}: any) => pizzas.isLoaded);
    const {activeCategory, sortBy} = useSelector(({filters}: any) => filters);
    const {page, limit} = useSelector(({pizzas}: any) => pizzas);

    React.useEffect(() => {
        if (!items) {
            dispatch(fetchPizzas(sortBy, null, page, null));
        }
    }, []);

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, activeCategory, page, limit));
    }, [activeCategory, sortBy, page, limit]);

    const onSelectCategory = React.useCallback(index => {
        dispatch(setActiveCategory(index));
    }, []);

    const onSelectSortType = React.useCallback((obj) => {
        dispatch(setSortBy(obj));
    }, []);

    const handleAddPizzaToCart = obj => {
        dispatch(addPizzaToCart(obj));
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={activeCategory}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}/>
                <SortPopup
                    activeSortType={sortBy.type}
                    onClickSortType={onSelectSortType}
                    items={sortItems}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map(obj => (
                        <PizzaBlock
                            onClickAddPizza={handleAddPizzaToCart}
                            key={obj.id}
                            addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            {...obj}/>
                    ))
                    : Array(12)
                        .fill(null)
                        .map((_, index) => <PizzaLoadingBlock key={index}/>)}
            </div>
            <Pages/>
        </div>
    );
}

export default Home;
