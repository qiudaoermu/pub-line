var fs = require("fs"); // 引入fs模块
function deleteall(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteall(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
function timestampToFile() {
  let time = new Date();
  return (
    time.getFullYear() +
    "-" +
    time.getMonth() +
    1 +
    "-" +
    time.getDate() +
    "-" +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds()
  );
}
module.exports = {
  deleteall,
  timestampToFile,
};
