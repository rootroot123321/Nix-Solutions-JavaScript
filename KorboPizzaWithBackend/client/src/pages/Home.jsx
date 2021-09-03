import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock, Pages} from '../components';
import {setCategories, setSortBy, setActiveCategory} from '../redux/actions/filters';
import {addPizzaToCart} from "../redux/actions/cart";
import {fetchCategories, fetchPizzas} from "../http/pizzaAPI";
import {setPizzas} from "../redux/actions/pizzas";

const sortItems = [
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'},
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {activeCategory, sortBy, categories} = useSelector(({filters}) => filters);
    const {page, limit} = useSelector(({pizzas}) => pizzas);

    useEffect(() => {
        fetchCategories().then(data => dispatch(setCategories(data)));
        if(!items) {
            fetchPizzas(null, page, null, sortBy.type, sortBy.order).then((data) => {
                let totalCount = data.count;
                dispatch(setPizzas(data.rows, page, 4, totalCount));
            });
        }
    }, []);

    useEffect(() => {
        fetchPizzas(activeCategory, page, limit, sortBy.type, sortBy.order).then(data => {
            let totalCount = data.count;
            dispatch(setPizzas(data.rows, page, limit, totalCount));
        });
    }, [activeCategory, page, limit, sortBy]);

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
                    items={categories}/>
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