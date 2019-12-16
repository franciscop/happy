const cmd = require("atocha");
const { read } = require("files");
const { stderrok } = require("./helpers");

module.exports = cli => ({
  title: "Linting",
  skip: async ctx => {
    if (!ctx.pkg) return true;
    if (!ctx.pkg.scripts.lint && !ctx.pkg.scripts.linter) return true;
  },
  task: async ctx => {
    if (ctx.pkg.scripts.lint) {
      return await cmd("npm run lint").catch(stderrok);
    }
    if (ctx.pkg.scripts.linter) {
      return await cmd("npm run linter").catch(stderrok);
    }
  }
});
