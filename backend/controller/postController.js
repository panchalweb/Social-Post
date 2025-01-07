const postModel = require('../model/postSchema')

exports.createPost = async (req , res) => {
    const data = req.body;
    const image = req.file.filename;
    

    const postData=
    {
        title : data.title,
        content : data.content,
        author_Name : data.author_Name,
        address : data.address,
        image : image,
        catID : data.catID
    }
    try {
        const post = await postModel.create(postData);
        res.status(201).json({
            message : 'Post created successfully',
            data : post
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

exports.getPost = async (req , res) => {
    try {
        const PostData = await postModel.find().populate('catID')
        res.status(200).json({
            status : 'Success',
            Message : 'Blog get Successfully',
            Data : PostData
        })
    } catch (error) {
        res.status(400).json({
            status : 'Fail',
            Message : error.message
        })
    }
}

exports.getPostById = async (req , res) => {
    try {
        const postData = await postModel.findById(req.params.id).populate('catID')
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Get Successfully' ,
            Data : postData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' ,
            Message : error.message
        })
    }
}

exports.deletePost = async (req , res) => {
    const deleteID = req.params.id
    console.log(deleteID , 'delete id');
    
    try {
        await postModel.findByIdAndDelete(deleteID)
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Deleted Successfully'
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}

exports.updatePost = async (req , res) => {
    const updateID = req.params.id
    const updatedData = req.body

    try {
        const newData = await postModel.findByIdAndUpdate(updateID , updatedData)
        res.status(200).json({
            status : 'Success' ,
            Message : 'Blog Updated Successfully',
            Data : newData
        }) 
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}
