// spawn thực thi 1 chức năng trên 1 process mới. Input là 1 câu lệnh, có thể truyền vào các đối số. Output là 1 stream I/O
const { spawn } = require('child_process');
const path = require('path');
const cron = require('node-cron');

const DB_NAME = 'WolfConsulting';
const ARCHIVE_PATH = path.join(__dirname, 'public', `${DB_NAME}.gzip`);

/* 
Basic mongo dump and restore commands, they contain more options you can have a look at man page for both of them.
1. mongodump --db=rbac_tutorial --archive=./rbac.gzip --gzip
2. mongorestore --db=rbac_tutorial --archive=./rbac.gzip --gzip
Using mongodump - without any args:
  will dump each and every db into a folder called "dump" in the directory from where it was executed.
Using mongorestore - without any args:
  will try to restore every database from "dump" folder in current directory, if "dump" folder does not exist then it will simply fail.
*/

// Scheduling the backup every days (using node-cron)
cron.schedule('*/5 * * * * *', () => backupMongoDB());

function backupMongoDB() {
    const child = spawn('mongodump', [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        '--gzip',
    ],
        { stdio: 'inherit', shell: true });

    child.stdout.on('data', (data) => {
        console.log('stdout:\n', data);
    });
    child.stderr.on('data', (data) => {
        console.log('stderr:\n', Buffer.from(data).toString());
    });
    child.on('error', (error) => {
        console.log('error:\n', error);
    });
    child.on('exit', (code, signal) => {
        if (code) console.log('Process exit with code:', code);
        else if (signal) console.log('Process killed with signal:', signal);
        else console.log('Backup is successfull ✅');
    });
}