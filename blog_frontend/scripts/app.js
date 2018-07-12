//console.log('JS Working')
const URL = 'https://sheltered-cliffs-90193.herokuapp.com/ajaxblog/'
const PostURL = 'https://sheltered-cliffs-90193.herokuapp.com/ajaxblog/'

const createBtn = document.querySelector('.createBlogBtn')
const form = document.querySelector('.form')
const blogForm = document.querySelector('.newBlog')
const blogContent = document.querySelector('#nav-tabContent')
let currentData = {}
let mainForm = document.querySelector('.mainContent')


window.onload = function() {

  axios.get(URL)
    .then(resp => resp.data)
    .then(displaySideBar)

}

createBtn.addEventListener('click', (event) => {
  event.preventDefault()
  createForm()

})

function refreshBlog() {
    clearMain()
  return axios.get(URL)
    .then(resp => resp.data)
    .then(displaySideBar)

}

function displaySideBar(blogs) {
  currentData = blogs
  console.log('CURRENT DATA IS: ===>', currentData)
  let sideBar = document.querySelector('.sideBar')
  let options = [`<a class="list-group-item list-group-item-action active"  id="list-${blogs[0].id}-list" data-toggle="list" href="#list-${blogs[0].id}" role="tab" aria-controls="home">${blogs[0].title}</a>`]

  for (let i = 1; i < blogs.length; i++) {
    options.push(`<a class="list-group-item list-group-item-action"  id="list-${blogs[i].id}-list" data-toggle="list" href="#list-${blogs[i].id}" role="tab" aria-controls="home">${blogs[i].title}</a>`)

  }

  sideBar.innerHTML = options.join('\n')
  console.log('IN DISPLAY, BLOGS IS: ', blogs)
  displayMain(blogs)

}

function clearMain() {
  let mainForm = document.querySelector('.mainContent')

  mainForm.classList.add("hidden")
}

function displayMain(blogs) {
  mainForm.innerHTML = '<div class="tab-content tabContent" id="nav-tabContent">'
  let editDelBtn = ''
  const tabContent = document.querySelector('.tabContent')
  const btnHold = document.querySelector('.btnHolder')
  let entries = [`<div class="tab-pane fade show active" id="list-${blogs[0].id}" role="tabpanel" aria-labelledby="list-${blogs[0].id}-list">${blogs[0].content}</div>`]

  for (let i = 1; i < blogs.length; i++) {
    entries.push(`<div class="tab-pane fade show" id="list-${blogs[i].id}" role="tabpanel" aria-labelledby="list-${blogs[i].id}-list">${blogs[i].content}</div>`)
    editDelBtn = `<button type="button" class="btn btn-primary editBtn">Edit</button>     <button type="button" class="btn btn-danger deleteBtn">Delete</button>`
  }

  tabContent.innerHTML = entries.join('\n') + editDelBtn
  const deleteBtn = document.querySelector('.deleteBtn')
  const editBtn = document.querySelector('.editBtn')

  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault()
    deleteBlog()
  })

  editBtn.addEventListener('click', (event) => {
    event.preventDefault()
    updateEntry()
  })

}


function createForm(){
  let mainForm = document.querySelector('.mainContent')

  mainForm.innerHTML = `
  \<form id="newBlogPost" action="" method="post">
    \<div class"form-group submit">
      \<label for='formTitle'>Title\</label>
      \<input type='text' class='form-control' id='formTitle' placeholder='blog title' required>

      \<label for='blogContent'>Content\</label>
      \<textarea class='form-control' id='blogContent' rows='3'>\</textarea>
      \<button type='submit' class='btn btn-large'>Create New Post\</button>
    \</div>
  \</form>`


  const blogForm = document.querySelector('#newBlogPost')

  blogForm.addEventListener('submit', (event) => {
      event.preventDefault()
      getBlogInfo()
  })
}

function updateEntry() {
  let selection = document.querySelector('.active')
  let id = selection.id.slice(5,11)
  let mainForm = document.querySelector('.mainContent')

  console.log(`${URL}${id}`)

  axios.get(`${URL}${id}`)
    .then(resp => resp.data)
    .then(updateForm)

  }

function updateForm(blog) {
  console.log('IN UPDATE WITH DATA: ', blog)

  mainForm.innerHTML = `
  \<form id="newBlogPost" action="" method="post">
    \<div class"form-group submit">
      \<label for='formTitle'>${blog.title}\</label>
      \<input type='text' class='form-control' id='${blog.id}' placeholder='blog title' required>

      \<label for='blogContent'>Content\</label>
      \<textarea class='form-control' id='${blogContent}' rows='3'>${blog.content}\</textarea>
      \<button type='submit' class='btn btn-large'>Update Post\</button>
    \</div>
  \</form>`



  console.log(`IN UPDATE: ${URL}${id}`)
//  return axios.put(`${URL}${id}`)

}



function deleteBlog() {
  let selection = document.querySelector('.active')
  let id = selection.id.slice(5,11)

  console.log(`IN DELETE: ${URL}${id}`)
  return axios.delete(`${URL}${id}`).then(resp => resp.data)
  .then(deleteEntry)
  .then(refreshBlog)


}

function deleteEntry(blog) {
  console.log('In DELETE ENTRY', blog)
  console.log('currentData is: ', currentData)
  let idx = currentData.indexOf(blog)

  console.log('ID IS: ', idx)
  currentData.splice(idx,1)
}

function getBlogInfo() {
  let blogTitle = document.querySelector('#formTitle').value
  let blogContent = document.querySelector('#blogContent').value



  axios.post(PostURL, {
      title: blogTitle,
      content: blogContent
    })
    .then(resp => resp.data.message)
    .then(console.log)
    .then(refreshBlog)


}
