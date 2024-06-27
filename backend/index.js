const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', router)

app.listen(3000, () => {
    console.log('Server started on port 3000');
})