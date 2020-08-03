const cmd = require("atocha");
const { read } = require("files");
const { stderrok } = require("./helpers");

module.exports = (cli) => ({
  title: "Testing project",
  skip: async (ctx) => {
    if (!ctx.pkg) return true;
    if (!ctx.pkg.scripts.test) return true;
  },
  task: async (ctx) => cmd("cross-env CI=true npm run test").catch(stderrok),
});
