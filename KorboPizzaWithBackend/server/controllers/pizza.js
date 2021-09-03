const {Pizza} = require('../models/models');
const {Sequelize} = require("sequelize");

class TypeController {
    async getAll(req, res) {
        let {categoryId, limit, page, sort, order} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let pizzas;
        if (!categoryId && !sort) {
            pizzas = await Pizza.findAndCountAll({limit, offset});
        }
        if(!categoryId && sort) {
            pizzas = await Pizza.findAndCountAll({order: Sequelize.literal(`${sort} ${order}`), limit, offset});
        }
        if (categoryId && sort) {
            pizzas = await Pizza.findAndCountAll({where: {categoryId}, order: Sequelize.literal(`${sort} ${order}`), limit, offset});
        }
        return res.json(pizzas);
    }
}

module.exports = new TypeController();