const needle = require("needle");
const fs = require("fs");
var colors = require("colors");

colors.setTheme({
  custom: ["white", "bgGreen"],
  error: ["white", "bgBlue"],
});
let pwd = process.cwd();
const buffer = fs.readFileSync(pwd + "/unpackage/dist/build/h5.zip");
let url = [
  "http://xxx.xxxx.xxxx.xxx:9527/file/uploading",
  "http://xxx.xxx.xxx.xxx:9527/file/uploading",
];
const data = {
  file: {
    buffer: buffer,
    filename: "mypackage.zip",
    content_type: "application/octet-stream",
  },
};

// the callback is optional, and needle returns a `readableStream` object
// that triggers a 'done' event when the request/response process is complete.
url.forEach((item) => {
  const site = item.replace("/file/uploading", "");
  console.log(`service ${site} uploading...`.error);

  needle.post(item, data, { multipart: true }, function (err, resp, body) {
    err && console.error(err);
    console.log(`service ${site} upload done...`.custom);
    // console.error(resp);
    // if you see, when using buffers we need to pass the filename for the multipart body.
    // you can also pass a filename when using the file path method, in case you want to override
    // the default filename to be received on the other end.
  });
});
