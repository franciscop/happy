const cmd = require("atocha");
const { read } = require("files");

module.exports = cli => ({
  title: "Linting",
  skip: async ctx => {
    if (!ctx.pkg.scripts.lint && !ctx.pkg.scripts.linter) return true;
  },
  task: async ctx => {
    if (ctx.pkg.scripts.lint) {
      return await cmd("npm run lint");
    }
    if (ctx.pkg.scripts.linter) {
      return await cmd("npm run linter");
    }
  }
});
