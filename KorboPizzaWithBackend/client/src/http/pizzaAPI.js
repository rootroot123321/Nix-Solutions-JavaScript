import {$host} from "./index";

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category');
    return data;
};

export const fetchPizzas = async (categoryId, page, limit = 5, sort, order) => {
    const {data} = await $host.get('api/pizza', {
        params: {
            categoryId,
            page,
            limit,
            sort,
            order
        }
    });
    return data;
}