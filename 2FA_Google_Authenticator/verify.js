const speakeasy = require('speakeasy');

const verify2AF = speakeasy.totp.verify({
    // secret chính là cái mã lấy từ secret.ascii (chính xác hơn là value) bên file index.js
    // encoding chính là key ascii từ biến secret bên file index.js
    // token chính là cái mã ta quét qr code
    secret: 'N<VfwwNgb5ga{kK*{Q]Im)T}$QQts^u{',
    encoding: 'ascii',
    token: '012345'
});

console.log(verify2AF); // true là hợp lệ, false là không hợp lệ