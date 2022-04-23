const express = require('express');
const nodemailer = require('nodemailer');   // Thư viện hỗ trợ email
const gTTS = require('gtts');               // Thư viện hỗ trợ text to speech
const fs = require('fs');                   // Thư viện hệ thống
const fastcsv = require('fast-csv');        // Thư viện hỗ trợ tải file csv
const { json } = require('express');

const app = express();
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

// DEMO EMAIL
// const username = 'liverpoolkien911@gmail.com';
// const password = 'liverpoolkien123';
// app.post('/sendMail', async (req, res) => {
//     const email = req.body.email;
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: username,
//             pass: password,
//         },
//         tls: {
//             rejectUnauthorized: false,
//         }
//     });
//     let mailOptions = {
//         from: username,
//         to: email,
//         subject: 'Hello ✔',
//         text: 'Hello Nguyen Trung Kien',
//         html: '<b>Hello Nguyen Trung Kien</b>',
//     }
//     await transporter.sendMail(mailOptions, (err) => {
//         if (err) {
//             return res.status(500).json({
//                 message: `Fail to send email to ${email}!`,
//                 status: false,
//                 err: err
//             });
//         }
//         else {
//             return res.status(500).json({
//                 message: `Success to send email to ${email}!`,
//                 status: true,
//             });
//         }
//     });
// })
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DEMO TEXT TO SPEECH
// const text = 'Nguyễn Trung Kiên và Thành Phố Hồ Chí Minh. Đại học Hoa Sen';
// const gtts = new gTTS(text, 'vi');
// gtts.save('voice.mp3', (err) => {
//     if (err) {
//         throw new Error(err);
//         console.log('Failure');
//     }
//     else {
//         console.log('Successfully');
//     }
// })
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// var escape = require('escape-html');
// var html = escape('foo & bar');
// console.log(html);
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// var toobusy = require('toobusy-js');
// var express = require('express');
// app.use((req, res, next) => {
//     if (toobusy()) {
//         res.send(503, 'Server too busy');
//     }
//     else {
//         next();
//     }
// })
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// const crypto = require('crypto');
// const key1 = crypto.randomBytes(32).toString('hex');
// const key2 = crypto.randomBytes(32).toString('hex');
// console.log({ key1, key2 });
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// Hướng dẫn lưu file csv dùng thư viện fast-csv
// app.get('/exportData', (req, res) => {
//     var data = [
//         { id: 1, name: 'Liverpool Fc', Tournament: 'Premier League' },
//         { id: 2, name: 'Barcelona Fc', Tournament: 'La Liga' },
//         { id: 3, name: 'Borussia Dortmund Fc', Tournament: ' Bundesliga' },
//     ]
//     // Ghi file
//     var ws = fs.createWriteStream('public/data.csv');
//     // Export data to csv
//     fastcsv.write(data, { headers: true })
//         .on('finish', function () {
//             return res.json({
//                 message: "Save file csv success",
//                 status: true
//             })
//         })
//         .pipe(ws);
// });
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// Hướng dẫn lưu file json
const EPL = {
    id: 1,
    rank: 1,
    name: 'Manchester City',
    tournament: 'Premier League'
}

const Bundesliga = {
    id: 2,
    rank: 2,
    name: 'Borussia Dortmund',
    tournament: 'Bundesliga'
}

const saveData = (data, file) => {
    const finished = (error) => {
        if (error) {
            console.log(error);
            return;
        }
    }
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(file, jsonData, finished);
}

saveData(EPL, 'EPL.json');
saveData(Bundesliga, 'Bundesliga.json');
// -------------------------------------------------------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
