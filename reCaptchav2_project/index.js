const express = require("express");
const fetch = require("node-fetch");

const app = express();

var comments = [];

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "\\index.html")
})

//Fetches the comments
app.get("/comments", (req, res) => {
    return res.json(comments.reverse())
})

//Adds comment to the database
app.post("/comments/:comment/:captcharesponse", async (req, res) => {
    //Verify the captcha 
    // Nhận 2 tham số là secret key và captcharesponse nhận về từ người dùng 
    const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6LeIansfAAAAAGUVwyEiGwC4y87KrwiTOB375jmx&response=${req.params.captcharesponse}`, {
        method: "POST"
    })
        .then(_res => _res.json())

    //Will only post the comment to the "database" if the captcha verification was a success => If the captcha is valid, the data will be returned
    if (captchaVerified.success === true) {
        comments.push(req.params.comment)
    }

    res.end()
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
})