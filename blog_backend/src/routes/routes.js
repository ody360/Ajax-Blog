const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/blog-ctrl')

router.get('/AJAXBlog', ctrl.getBlogs)
router.get('/AJAXBlog/:id', ctrl.getBlog)
router.post('/AJAXBlog', ctrl.postBlogs)
router.put('/AJAXBlog/:id', ctrl.putBlog)
router.delete('/AJAXBlog/:id', ctrl.deleteBlog)



module.exports = router
