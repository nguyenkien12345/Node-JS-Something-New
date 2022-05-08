const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

// Chuyển file từ quyền private về quyền public để bất cứ ai cũng có thể xem file này
const setFilePublic = async (fileId) => {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        // Lấy ra đường dẫn url của file (webContentLink: Khi click vô nó sẽ tự động tải file xuống, webViewLink: Khi click vô nó sẽ tự động chuyển đến url file đó)
        const getUrl = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })
        return getUrl;
    } catch (error) {
        console.error(error);
    }
}

const uploadFile = async ({ shared }) => {
    try {
        // Tạo file
        const createFile = await drive.files.create({
            // Thông tin lưu file trên disk của google drive
            requestBody: {
                name: "NGUYENTHIHONGHA",
                mimeType: 'image/jpg'
            },
            // Thông tin lấy file từ máy để up lên google drive
            media: {
                body: fs.createReadStream(path.join(__dirname, '../images/HongHa3.jpg')),
                mimeType: 'image/jpg'
            }
        });
        // Lấy ra id của file
        const fileId = createFile.data.id;
        console.log("FILE ID: ", createFile.data);
        // Lấy ra url của file
        const getUrl = await setFilePublic(fileId);
        console.log('GET URL: ', getUrl.data);
    }
    catch (error) {
        console.error(error);
    }
};

const deleteFile = async (fileId) => {
    try {
        const deleteFile = await drive.files.delete({
            fileId: fileId
        })
        console.log('DeleteFile Data: ', deleteFile.data);
        console.log('DeleteFile Status: ', deleteFile.status);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { uploadFile, deleteFile, setFilePublic }