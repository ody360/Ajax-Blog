
function createBlogPost() {
    return `
  \<form id="newBlogPost" action="" method="post">
    \<div class"form-group submit">
      \<label for='formTitle'>Title\</label>
      \<input type='text' class='form-control' id='formTitle' placeholder='blog title' required>

      \<label for='blogContent'>Content\</label>
      \<textarea class='form-control' id='blogContent' rows='3'>\</textarea>
      \<button type='submit' class='btn btn-large'>Create New Post\</button>
    \</div>
  \</form>`
}

function createNewBlogPost(blog) {
  return `
  \<form id="newBlogPost" action="" method="put">
    \<div class"form-group submit">
      \<label for='formTitle'>Title\</label>
      \<input type='text' class='form-control' id='formTitle' value='${blog.title}' required>

      \<label for='blogContent'>Content\</label>
      \<textarea class='form-control' id='blogContent' rows='3'>${blog.content}\</textarea>
      \<button type='submit' class='btn btn-large'>Update Post\</button>
    \</div>
  \</form>`
}

module.exports = { createBlogPost, createNewBlogPost }