import cmd from "atocha";
import { wtf } from "./helpers.js";

export default (cli) => ({
  title: "Uploading changes",
  skip: async () => {
    const status = await cmd(`git status`);
    const hasCommited = /Your branch is ahead of/.test(status);
    if (!hasCommited) return true;
  },
  task: async () => await cmd(`git push`).catch(wtf),
});
