const shortID = require('short-id')
let blogs = require('./data.js').BLOGS

function postBlogs(body) {
  let blog = {}
  let err = {}
//  console.log('IN MODEL POST BLOGS:', body)
  if(!body.title) {
    err.status = 400
    err.errors = 'Title needed'
    return err
  } else {
      console.log('Entering daata to blog array')
      blog.title = body.title
      blog.content = body.content
      blog.id = shortID.generate()

      blogs.push(blog)

    }
    console.log('blog IS CURRENTLY', blog)
    console.log('BLOGS IS: ', blogs)
  return blogs
}

function getBlogs() {
  return blogs
}

function getBlog(id) {
  let err = {}
  let blog = blogs.find(b => b.id == id)

  console.log('IN GET 1 BLOG, ', blog)
  if(!blog || blog == undefined) {
    err.status = 404
    err.errors = 'Blog ID Not Found'

    return err
  }

  return blogs

}

function putBlog(id, body) {
  let err = {}
  let blog = blogs.find(b => b.id == id)
  if(!blog) {
    err.status = 404
    err.errors = 'Blog ID Not Found'
  }

  if (body.title){ blog.title = body.title }
  if (body.content) {blog.content = body.content}

  return blog

}

function deleteBlog(id) {
  console.log('IN DELETE Blog')
  let blogIdx
  let err = {}
  let blog = blogs.find(b => b.id == id)

  console.log('CHECKING ID FOR BLOG, FOUND: ', blog)
  if(!blog || blog==undefined) {
    err.status = 404
    err.errors = 'Blog not found, invalid ID'
    return err
  } else {

    blogIdx = blogs.indexOf(blog)

  }
  return blogs.splice(blogIdx,1)
}



module.exports = {postBlogs, getBlogs, getBlog, putBlog, deleteBlog}
