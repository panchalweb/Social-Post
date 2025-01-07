const categoryModel = require('../model/categorySchema')

exports.createCategory = async (req, res) => {
    try {
        const data = req.body;
        // console.log(data);
        const category = await categoryModel.create(data);
        res.status(201).json({
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message : error.message
        });
    }
}

exports.getCategory = async (req , res) => {
    try {
        const category = await categoryModel.find()
        res.status(200).json({
            message : 'Category fetched successfully',
            data : category
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}