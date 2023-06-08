const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middlewares/errorHandler')

const app = express()

// Connect Database
connectDB()

// cors
app.use(cors({ origin: true, credentials: true }))

// Init Middleware
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }))

// router
const users = require('./routes/userRoutes')
app.use('/api/users', users)

app.use(errorHandler)

const port = process.env.PORT || 8083;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})