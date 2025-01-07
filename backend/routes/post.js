var express = require('express');
var router = express.Router();
const BC = require('../controller/postController')
const upload = require('../middleware/multer')

router.post('/addPost', upload.single('image') , BC.createPost)
router.get('/getPost' , BC.getPost)
router.get('/getBlog/:id' , BC.getPostById)
router.delete('/deleteBlog/:id' , BC.deletePost)
router.patch('/updateBlog/:id' , upload.single('image') , BC.updatePost)


module.exports = router;
