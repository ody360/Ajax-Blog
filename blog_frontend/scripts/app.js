console.log('JS Working')
const URL = 'http://localhost:8000/AJAXBlog/'
//const PostURL = 'https://galvanize-student-apis.herokuapp.com/gpersonnel/users'

const createBtn = document.querySelector('.createBlogBtn')
const form = document.querySelector('.form')
const blogForm = document.querySelector('.newBlog')
const blogContent = document.querySelector('#nav-tabContent')

window.onload = function() {

  axios.get(URL)
    .then(resp => resp.data)
    .then(addToBlog)
  //  .then(setPicture)

  console.log('Still Alive!')

}

createBtn.addEventListener('click', (event) => {
  event.preventDefault()
  createForm()

})

// submitBtn.addEventListener('submit', (event) => {
//   blog.title = document.querySelector('#title').value
//   blog.content = document.querySelector('#content').value
// }

function addToBlog(blogs) {
  console.log(blogs)
  const list = document.querySelector('#listTab')
  const options = blogs.map(entry => `<a class="list-group-item list-group-item-action"  data-toggle="list" href="#list-profile" role="tab" aria-controls="${blogs.title}">${blogs.title}</a>`)
  const tabContent = document.querySelector('#navtabContent')
  const entries = blogs.map(entry => `<div class="tab-pane fade show" id="list-home" role="tabpanel" aria-labelledby="list-home-list">${blogs.content}</div>`)
  //list.innerHTML = '<option disabled selected>Select A Role</option>' + options.join('')

}

function createForm(){
  let mainForm = document.querySelector('.mainContent')

  mainForm.innerHTML = `\<form> \<div class"form-group">
      \<label for='formTitle'>Title\</label>
      \<input type='text' class='form-control' id='formTitle' placeholder='blog title'>
    \</div>
    \<div class='form-group'>
      \<label for='blogContent'>Content\</label>
      \<textarea class='form-control' id='blogContent' rows='3'>\</textarea>
      \<button type='submit' class='btn btn-large submit'>Create New Post\</button>
    \</div>
  \</form>`

  const submitBtn = document.querySelector('submit')


}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault()



})
