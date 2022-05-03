// Ghi nhật ký bằng cách ghi đè đầu ra trước đó trong thiết bị đầu cuối. Hữu ích để hiển thị thanh tiến trình, hoạt ảnh, v.v.
import logUpdate from 'log-update';
import nodemon from 'nodemon';

// DEMO 1
// let frames = ['loading', 'loading.', 'loading..', 'loading...'];  // Thứ tự chạy sẽ là 'loading.', 'loading..', 'loading...', 'loading'
// let frames = ['/', '-', '\\'];                                    // Vì \ là ký tự đặc biệt nên ta phải thêm 1 gạch trước nó
// let frames = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚',];
// let i = 0;
// setInterval(() => {
//     const frame = frames[i++ % frames.length];
//     logUpdate(frame);
// }, 200);

// DEMO 2
const char = '🤍';
const min = 0;    // 0%
const max = 100;  // 100%
const steps = 5;  // Bước nhảy là 5
let num = 1;

const mInterval = setInterval(() => {
    let progress = '';
    for (let i = 0; i < num; i++) {
        progress += char;
    }
    const progressString = `Loading: [ ${progress} ] \n ${num * steps}`;
    logUpdate(progressString);
    num++;
    if (num > max / steps) {
        logUpdate.done();
        clearInterval(mInterval);
    }
}, 300);


