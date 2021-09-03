import * as React from 'react';

interface CategoriesProps {
    activeCategory: (null|number);
    items: Array<string>;
    onClickCategory: (index: (null|number)) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(function Categories({activeCategory = null, items = [], onClickCategory}: CategoriesProps) {
    return (
        <div className="categories">
            <ul>
                <li
                    className={activeCategory === null ? 'active' : ''}
                    onClick={() => onClickCategory(null)}>
                    Все
                </li>
                {items &&
                items.map((name, index) => (
                    <li
                        className={activeCategory === index + 1 ? 'active' : ''}
                        onClick={() => onClickCategory(index + 1)}
                        key={`${name}_${index}`}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
