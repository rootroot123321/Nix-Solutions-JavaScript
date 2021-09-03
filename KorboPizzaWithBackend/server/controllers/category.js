const {Category} = require("../models/models");

class CategoryController {
    async getAll(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

module.exports = new CategoryController();