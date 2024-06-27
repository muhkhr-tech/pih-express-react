const express = require('express')
const router = require('./routes')

const app = express()

app.use('/api', router)

app.listen(3000, () => {
    console.log('Server started on port 3000');
})