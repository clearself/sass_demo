var fs = require('fs')
var process = require('child_process');
const chalk = require("chalk");
const exec = require('child_process').exec;
const { info, done, warn, error,log } = require("./utils");
async function lsExample(str,x) {
  const { stdout, stderr } = await exec(str);
  console.log(chalk.yellow(`开始打包：${x}`));
		console.log(stdout);
	log(chalk` {green 打包完成：${x}\n\n}`);
}
fs.readFile('projects.json', function(err, data) {
    if (err) {
        return console.error(err);
    }
    var person = data.toString(); //将二进制的数据转换为字符串
    person = JSON.parse(person); //将字符串转换为json对象
	log(chalk` {red 正在准备打包...\n\n}`);
    for (let x in person) {
        let cmd = `npm run build ${x} && sleep 1`;
		//lsExample(cmd,x)
		process.exec(cmd, function(error, stdout, stderr) {
			log(chalk` {red 开始打包：${x}}`);
            console.log(stdout);
			log(chalk` {green 打包完成：${x}\n\n}`);
		});
		
    }
})
