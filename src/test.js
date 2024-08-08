import cmd from "atocha";

import { stderrok } from "./helpers.js";

const ci = "export CI=true || set CI=true&&";

export default (cli) => ({
  title: "Testing project",
  skip: async (ctx) => {
    if (!ctx.pkg) return true;
    if (!ctx.pkg.scripts.test) return true;
  },
  task: async () => cmd(`${ci} npm run test`).catch(stderrok),
});
