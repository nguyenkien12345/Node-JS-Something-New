const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const qrcode = require('qrcode');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// routes
app.get('/', (req, res, next) => {
    return res.render('index');
})

app.post('/scan', (req, res, next) => {
    let qrcode_text = req.body.qrcode_text;
    if (qrcode_text === null || qrcode_text === '') {
        return res.json({
            message: 'Please enter your qrcode text',
            status: false
        })
    }
    else {
        // Create QR Code
        qrcode.toDataURL(qrcode_text, (err, data) => {
            if (err) {
                return res.json({
                    message: 'Something is wrong when create qrcode',
                    status: false
                })
            }
            else {
                return res.render('scan', { qrcode: data })
            }
        })
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
})