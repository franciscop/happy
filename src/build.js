const cmd = require("atocha");
const { read } = require("files");

let test = "jest";

module.exports = cli => ({
  title: "Building project",
  skip: async ctx => {
    if (!ctx.pkg.scripts.build) return true;
  },
  task: async ctx => {
    return await cmd(ctx.pkg.scripts.build);
  }
});
