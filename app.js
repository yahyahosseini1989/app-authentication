const homeRoute = require('./routes/home-route')
const coursesRoute = require('./routes/courses-route')
const usersRoute = require('./routes/users-route')

require('dotenv').config()
const express = require('express')
 
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/courses', coursesRoute)
app.use('/api/users', usersRoute)
app.use('/', homeRoute)

const port = process.env.APP_PORT || 8000
app.listen(port, () => { console.debug(`App listening on port ${port}`) })