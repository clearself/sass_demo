/* eslint-disable no-console */
const chalk = require("chalk");
const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);

exports.log = (msg = "", tag = null) => {
  tag ? console.log(chalkTag(tag), msg) : console.log(msg);
};

exports.info = (msg, tag = null) => {
  console.log(chalk.bgBlue.black(" INFO ") + (tag ? chalkTag(tag) : ""), msg);
};

exports.done = (msg, tag = null) => {
  console.log(chalk.bgGreen.black(" DONE ") + (tag ? chalkTag(tag) : ""), msg);
};

exports.warn = (msg, tag = null) => {
  console.warn(chalk.bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""), chalk.yellow(msg));
};

exports.error = (msg, tag = null) => {
  console.error(chalk.bgRed(" ERROR ") + (tag ? chalkTag(tag) : ""), chalk.red(msg));
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};
