const express = require('express');
const nodemon = require('nodemon');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const PORT = 5000;

app.get('/cookie/get', (req, res) => {
    const cookies = req.cookies;
    console.log('Cookies: ', cookies);
    res.send(cookies);
});

app.get('/cookie/set', (req, res) => {
    res
        .cookie('username1', 'Nguyễn Trung Kiên', {
            // maxAge: 5*1000                               // Cookie tồn tại trong 5 giây (Format theo miliseconds)
            // expires: new Date(Date.now() + 5*1000)       // Cookie tồn tại trong 5 giây (Format theo ngày)
            httpOnly: false,                                // Cho phép người dùng truy cập qua browser để lấy ra cookie nếu như httpOnly là false
            secure: false                                   // Người dùng có thể dùng document.cookie để lấy ra cookie => Không nên
        })
        .cookie('username2', 'Nguyễn Hồng Quân', {
            httpOnly: true,                                // Không cho phép người dùng truy cập qua browser để lấy ra cookie nếu như httpOnly là true
            secure: true                                   // Người dùng không thể dùng document.cookie để lấy ra cookie => Nên
        })
    res.send('SET COOKIES');
})

app.get('/cookie/del', (req, res) => {
    res.clearCookie('username2');
    res.send('DEL COOKIES');
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})