const cmd = require("atocha");
const { read } = require("files");
const { stderrok } = require("./helpers");

let test = "jest";

module.exports = cli => ({
  title: "Building project",
  skip: async ctx => {
    if (ctx.now) return true;
    if (!ctx.pkg.scripts.build) return true;
  },
  task: async ctx => cmd("npm run build").catch(stderrok)
});
