const express = require("express");
const app = express();
const { deleteall, timestampToFile } = require("./until");
const compressing = require("compressing");
const swig = require("swig");
const multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");
const { unzipPath } = require("./setting");
//设置swig页面不缓存

app.set("view cache", false);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", swig.renderFile);
app.disable("view cache");
swig.setDefaults({ cache: false });
// 上传文件存放目录
let uploadDirPath = path.resolve(__dirname, "./public/list");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Express",
    fileList: fs.readdirSync(uploadDirPath).map((files) => files),
  });
});
/* 上传 */
app.post("/file/uploading", (req, res, next) => {
  /* 生成multiparty对象，并配置上传目标路径 */
  var form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = "utf-8";
  // 设置文件存储路劲
  form.uploadDir = uploadDirPath;
  // 设置文件大小限制
  form.maxFilesSize = 1000000 * 1024 * 1024;
  // form.maxFields = 1000;   //设置所有文件的大小总和//上传后处理
  form.parse(req, (err, fields, files) => {
    var filesTemp = JSON.stringify(files, null, 2);
    if (err) {
      console.log("parse error:" + err);
    } else {
      console.log("parse files:" + filesTemp);

      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      const dstPath = uploadDirPath + "/" + "h5-" + timestampToFile() + ".zip";
      // 重命名为真实文件名
      let fileName = inputFile.originalFilename.split(".")[0];
      fs.rename(uploadedPath, dstPath, (err) => {
        if (err) {
          console.log("rename error:" + err);
        } else {
          deleteall(unzipPath + "/" + fileName);
          compressing.zip
            .uncompress(dstPath, unzipPath)
            .then(() => {
              console.log("unzip", "success");
            })
            .catch((err) => {
              console.error("unzip", err);
            });
          console.log("rename ok");
        }
      });
    }
    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" });
    res.write("200");
    res.end();
  });
});

app.use(express.static("public")).listen(9527);
