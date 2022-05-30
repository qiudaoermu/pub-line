var compressing = require("compressing");
let fs = require("fs");
var colors = require("colors");

colors.setTheme({
  custom: ["white", "bgYellow"],
});
const options = {
  targetPath: "/unpackage/dist/build/h5/",
  outPut: "/unpackage/dist/build/h5.zip",
};
if (!options.targetPath) {
  console.log("error".error);
  console.log("targetPath is not defined".custom);
}
if (!options.outPut) {
  console.log("error".error);
  console.error("outpath is not defined".custom);
}

// copy:'/dist/index.html', copyTo:'/dist；

let pathout = process.cwd() + options.targetPath;
let outPath = process.cwd() + "/" + options.outPut;
// zip.addLocalFolder(pathout);
// zip.writeZip(outPath);
compressing.zip
  .compressDir(pathout, outPath)
  .then(() => {
    console.log("compress h5 folder done...".custom);
  })
  .catch((err) => {
    console.error("unzip", err);
  });
