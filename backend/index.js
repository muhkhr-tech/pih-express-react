const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(3000, () => {
    console.log('Server started on port 3000');
})