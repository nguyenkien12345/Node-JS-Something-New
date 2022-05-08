const express = require('express');
const nodemon = require('nodemon');
const app = express();

app.get('/', (req, res, next) => {
    try {
        return res.json({
            message: 'HELLO DOCKER',
            status: true
        })
    }
    catch (err) {
        next(err);
    }
})

app.listen(3000, () => {
    console.log('Server is running at PORT 3000');
})