const cmd = require("atocha");
const { read } = require("files");

module.exports = cli => ({
  title: "Publish package to npm",
  skip: async ctx => {
    return !cli.flags.publish;
  },
  task: async ctx => {
    console.log("PUBLISHING");
  }
});
