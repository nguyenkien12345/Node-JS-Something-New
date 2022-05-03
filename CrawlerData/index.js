const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require("fs");
const path = require("path");
const urlParser = require("url");
const nodemon = require('nodemon');

// Các url nào đã xuất hiện rồi sẽ không cho xuất hiện lại
const seenUrls = {};

const getUrl = (link, host, protocol) => {
    // Nếu đường dẫn có chứa http thì trả về chính đường dẫn đó, ngược lại thì thì thêm host và protocol vào trước link 
    if (link.includes('http')) {
        return link;
    }
    else if (link.startsWith("/")) {
        return `${protocol}//${host}${link}`;
    } else {
        return `${protocol}//${host}/${link}`;
    }
}

const crawl = async ({ url, ignore }) => {
    // Nếu mà url đã tồn tại thì trả về luôn không làm gì nữa
    if (seenUrls[url]) return;
    // Chạy đệ quy. 
    // Khi ta gọi links.forEach((link) => {crawl({url: getUrl(link),});}); nó sẽ liên tục gọi đi gọi lại lấy ra các url và quay về đầu hàm crawl chạy lại từ đầu
    console.log("Crawling: ", url);
    // Các url nào đã xuất hiện rồi sẽ không cho xuất hiện lại
    seenUrls[url] = true;

    // Lấy ra protocol và host từ url
    const { host, protocol } = urlParser.parse(url);

    const response = await fetch(url);
    // Lấy ra toàn bộ đoạn text html của trang web
    const html = await response.text();

    // Gọi thư viện cheerio để lấy ra toàn bộ đoạn text html
    const $ = cheerio.load(html);
    // Lấy ra toàn bộ các thẻ thuộc tính href trong tất cả các thẻ a trong html
    const links = $('a').map((index, link) => link.attribs.href).get();

    // Lấy ra toàn bộ các thẻ thuộc tính src trong tất cả các thẻ img trong html
    const imageUrls = $("img").map((i, image) => image.attribs.src).get();

    // Duyệt qua toàn bộ tất cả các thẻ imageUrls để lấy ra từng tấm ảnh
    imageUrls.forEach((imageUrl) => {
        fetch(getUrl(imageUrl, host, protocol))
            .then((response) => {
                const filename = path.basename(imageUrl);
                const dest = fs.createWriteStream(path.join(__dirname, `images/${filename}`));
                response.body.pipe(dest);
            });
    });

    // Duyệt qua toàn bộ tất cả các thẻ link để lấy ra từng đường dẫn
    links
        .filter((link) => link.includes(host) && !link.includes(ignore))
        .forEach((link) => {
            crawl({
                url: getUrl(link, host, protocol),
                ignore,
            });
        });
};

crawl({
    url: "http://stevescooking.blogspot.com/",
    ignore: "/search",
})