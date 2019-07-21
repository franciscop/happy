// Analyze the project and find the right script for each thing
const cmd = require("atocha");
const { exists, read } = require("files");

let analysis;

module.exports = cli => ({
  title: "Analyzing Project",
  skip: async ctx => !(await exists("package.json")),
  task: async ctx => {
    const pkg = await read("package.json");
    ctx.pkg = JSON.parse(pkg);
  }
});
