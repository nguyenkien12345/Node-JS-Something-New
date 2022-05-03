const express = require('express');
const nodemailer = require('nodemailer');   // Thư viện hỗ trợ email
const gTTS = require('gtts');               // Thư viện hỗ trợ text to speech
const fs = require('fs');                   // Thư viện hệ thống
const fastcsv = require('fast-csv');        // Thư viện hỗ trợ tải file csv
const twilio = require('twilio');           // Thư viện hỗ trợ gửi sms
const dotenv = require('dotenv');

dotenv.config();

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
// const EPL = {
//     id: 1,
//     rank: 1,
//     name: 'Manchester City',
//     tournament: 'Premier League'
// }

// const Bundesliga = {
//     id: 2,
//     rank: 2,
//     name: 'Borussia Dortmund',
//     tournament: 'Bundesliga'
// }

// const saveData = (data, file) => {
//     const finished = (error) => {
//         if (error) {
//             console.log(error);
//             return;
//         }
//     }
//     const jsonData = JSON.stringify(data, null, 2);
//     fs.writeFile(file, jsonData, finished);
// }

// saveData(EPL, 'EPL.json');
// saveData(Bundesliga, 'Bundesliga.json');
// -------------------------------------------------------------------------------------------------------------------------------------------------------

// DEMO SMS
app.get("/sendSMS", async (req, res, next) => {
    var accountSid = process.env.Account_SID;        // Your Account SID from www.twilio.com/console
    var authToken = process.env.Auth_Token;          // Your Auth Token from www.twilio.com/console

    var client = new twilio(accountSid, authToken);

    client.messages
        .create({
            body: "Hello Park Chaeyoung Hana",
            to: "+84972579495",         // Text this number
            from: "+19379303753",       // From a valid Twilio number
        })
        .then((data) => {
            console.log("Data: ", data);
            return res.status(201).json({
                message: 'Send otp successfully',
                status: true
            })
        })
        .catch((err) => {
            console.log("Errror: ", err);
            return res.status(409).json({
                message: 'Send otp failure',
                status: false
            })
        })

});
// -------------------------------------------------------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
