import cmd from "atocha";
import { stderrok } from "./helpers.js";

export default (cli) => ({
  title: "Building project",
  skip: async (ctx) => {
    if (!ctx.pkg) return true;
    if (!ctx.pkg.scripts.build) return true;
  },
  task: async () => cmd("npm run build").catch(stderrok),
});
