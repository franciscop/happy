const cmd = require("atocha");
const { read } = require("files");
const { stderrok } = require("./helpers");

const ci = "export CI=true || set CI=true&&";

module.exports = (cli) => ({
  title: "Linting",
  skip: async (ctx) => {
    if (!ctx.pkg) return true;
    if (!ctx.pkg.scripts.lint && !ctx.pkg.scripts.linter) return true;
  },
  task: async (ctx) => {
    if (ctx.pkg.scripts.lint) {
      return await cmd(`${ci} npm run lint`).catch(stderrok);
    }
    if (ctx.pkg.scripts.linter) {
      return await cmd(`${ci} npm run linter`).catch(stderrok);
    }
  },
});
