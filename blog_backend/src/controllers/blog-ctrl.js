const model = require('../models/blog-models')
let blogs = require('../models/data').BLOGS


function getBlogs(req, res, next) {
  const data = model.getBlogs()

  res.status(200).send(data)
}

function getBlog(req, res, next) {
  const data = model.getBlog(req.params.id)

  if(data.errors) {
    console.log('RECEIVED ERROR')
    return next({status: data.status, errors: data.errors})
  } else {
    res.status(200).send(data)
  }
}


function postBlogs(req, res,next) {
  const data = model.postBlogs(req.body)

  if(data.errors) {
    return next({status: data.status, errors: data.errors})
  } else {
    console.log('IN POST BLOG ABOUT TO RETURN DATA', data)
  //  res.status(201).send({title: data.title, content:data.content})
  res.status(201).send(data)
  }
}

function putBlog(req, res, next) {
  const data = model.putBlog(req.params.id, req.body)

  if(data.errors) {
    return next({status: data.status, errors: data.errors})
  } else {
    res.status(201).send(data)
  }
}

function deleteBlog(req, res, next) {
  const data = model.deleteBlog(req.params.id)
  console.log('IN DELETE, GOT DATA: ', data)
  if(data.errors) {
    console.log('DELETE BLOG ERROR')
    next({status: data.status, error: data.errors})
  } else {
    res.status(200).send(data)
  }
}
module.exports = {getBlogs, getBlog, postBlogs, putBlog, deleteBlog}
