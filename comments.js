// Create web server

// import module
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// create server
http.createServer((req, res) => {
    // get path
    let pathName = url.parse(req.url).pathname;
    // if path is '/'
    if (pathName == '/') {
        pathName = '/index.html';
    }
    // get file extension name
    let extName = path.extname(pathName);
    // read file
    fs.readFile('./static' + pathName, (err, data) => {
        // if file does not exist
        if (err) {
            fs.readFile('./static/404.html', (err, data) => {
                res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
                res.write(data);
                res.end();
            })
        } else {
            // get file extension name
            let ext = getExt(extName);
            // set header
            res.writeHead(200, { 'Content-Type': ext + ';charset="utf-8"' });
            // write data
            res.write(data);
            // end
            res.end();
        }
    })
}).listen(8080);

// get file extension name
function getExt(extName) {
    switch (extName) {
        case '.html':
            return 'text/html';
            break;
        case '.css':
            return 'text/css';
            break;
        case '.js':
            return 'text/javascript';
            break;
        default:
            break;
    }
}