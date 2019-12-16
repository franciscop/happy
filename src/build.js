const cmd = require("atocha");
const { read } = require("files");
const { stderrok } = require("./helpers");

let test = "jest";

module.exports = cli => ({
  title: "Building project",
  skip: async ctx => {
    // if (ctx.now) return "--now skips the build step";
    if (!ctx.pkg.scripts.build) return "no build script found";
  },
  task: async ctx => cmd("npm run build").catch(stderrok)
});
