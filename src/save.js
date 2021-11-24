const cmd = require("atocha");
const meow = require("meow");
const { stderrok } = require("./helpers");

// ISO 8601 without milliseconds (which is still ISO 8601)
const time = () => new Date().toISOString().replace(/\.[0-9]{3}/, "");

module.exports = (cli) => ({
  title: "Saving changes",
  skip: async () => {
    const status = await cmd(`git status`);
    const hasAdded = /untracked files present/i.test(status);
    const hasEdited = /Changes not staged for commit/i.test(status);
    const hasUncommited = /Changes to be committed/i.test(status);
    if (!hasAdded && !hasEdited && !hasUncommited) return true;
  },
  task: async () => {
    const message = cli.input[0] || `Saved on ${time()}`;
    await cmd(`git add . -A`).catch(stderrok);
    return await cmd(`git commit -m "${message}"`).catch(stderrok);
  },
});
