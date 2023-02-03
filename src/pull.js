import cmd from "atocha";
import { wtf } from "./helpers.js";

export default (cli) => ({
  title: "Downloading latest",
  skip: async () => {
    const status = await cmd(`git status`);
    const ahead = /Your branch is ahead of/.test(status);
    if (ahead) return true;
    const updated = /Your branch is up to date with/.test(status);
    if (updated) return true;
  },
  task: async () => await cmd(`git pull origin master`).catch(wtf),
});
