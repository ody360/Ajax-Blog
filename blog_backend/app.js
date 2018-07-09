const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 8000
const listener = ()=> console.log(`Listening on port ${port}`)

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.disable('x-powered-by')
app.listen(port,listener)

const routes = require('./src/routes/routes')
app.use('/' , routes)

app.use((err, req, res, next) => {
  console.log('Received error!' ,err)
  const status = err.status || 500
  const message = err.errors || 'Internal Server Error'

  res.status(err.status).send(err.errors)
})

module.exports = app
