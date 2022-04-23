const express = require('express');
// Tạo ra mã QR Code
const qrcode = require('qrcode');
// Tạo ra mật khẩu 1 lần. Nó sẽ tạo mới sau mỗi 30 giây. Nó sẽ tạo mã thông báo dựa trên thời gian hiện tại và 1 mật khẩu bí mật được trả về cho người dùng
const speakeasy = require('speakeasy');

const app = express();

// name: value (value có thể là bất kỳ giá trị nào)
const secret = speakeasy.generateSecret({ name: "WeAreDevs" });
console.log("Secret: ", secret);

// Tạo ra Qr code
qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    if (!err) {
        console.log(data);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
})