import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../redux/actions/pizzas";

const Pages = () => {
    const dispatch = useDispatch();
    const {page:currentPage, totalCount, limit} = useSelector(({pizzas}) => pizzas);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];
    for(let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    return (
        <div className="pages">
            {pages.map(page =>
                <div
                    key={page}
                    className={`page ${page === currentPage ? 'current_page' : ''}`}
                    onClick={() => dispatch(setPage(page))}>{page}</div>
            )}
        </div>
    );
};

export default Pages;