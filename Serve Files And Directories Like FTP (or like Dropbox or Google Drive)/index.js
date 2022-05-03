const express = require('express');
const serveIndex = require('serve-index');
const nodemon = require('nodemon');

const app = express();

// Khi chạy http://localhost:3000/ftp thì mặc định nó sẽ chạy đến folder ftp và từ đó ta có thể truy cập các thư mục con trong thư mục cha ftp
//  => { icons: true } nó sẽ hiển thị dạng icon
app.use('/ftp', express.static('public/ftp'), serveIndex('public/ftp', { icons: true }))

app.listen(3000, () => console.log('Server is running at PORT 3000'));