import cmd from "atocha";
import { stderrok } from "./helpers.js";

const ci = "export CI=true || set CI=true&&";

export default (cli) => ({
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
