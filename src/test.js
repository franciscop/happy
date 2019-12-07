const cmd = require("atocha");
const { read } = require("files");

module.exports = cli => ({
  title: "Testing project",
  skip: async ctx => {
    if (!ctx.pkg.scripts.test) return true;
  },
  task: async ctx => {
    return await cmd("npm run test");
  }
});
