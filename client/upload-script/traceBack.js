const { NodeSSH } = require("node-ssh");
const arg = process.argv.splice(2);
const ssh = new NodeSSH();
const outPath = "/usr/local/nginx/node-upload/public/list";
ssh
  .connect({
    host: "xxx.xxx.xxx.xxxx",
    username: "root",
    password: "8121022@@@Cc",
  })

  .then(function () {
    // 列进所有部署包
    if (`${arg}` === "ls") {
      ssh.execCommand(`ls`, { cwd: `${outPath}` }).then(function (result) {
        if (result.stderr) {
          console.error(result.stderr);
          return;
        }
        console.log(result.stdout);
      });
      return;
    }
    // 复制文件到 nginx 静态目录下
    ssh
      .execCommand(`cp ${arg} /usr/local/nginx/html`, {
        cwd: `${outPath}`,
      })
      .then(function (result) {
        if (result.stderr) {
          console.error(result.stderr);
          return;
        }
      });
    // 解压相关zip
    ssh
      .execCommand(`unzip -o ${arg}`, {
        cwd: `/usr/local/nginx/html`,
      })
      .then(function (result) {
        if (result.stderr) {
          console.error(result.stderr, "error********************************");
          return;
        }
        console.log(result.stdout);
      });
  });
