const cmd = require("atocha");
const { read } = require("files");

let test = "jest";

module.exports = cli => ({
  title: "Testing project",
  skip: async ctx => {
    if (!ctx.pkg.scripts.test) return true;
  },
  task: async ctx => {
    return await cmd(ctx.pkg.scripts.test);
  }
});
