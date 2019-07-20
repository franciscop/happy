const cmd = require("atocha");
const { wtf } = require("./helpers");

module.exports = cli => ({
  title: "Downloading latest version",
  skip: async () => {
    const status = await cmd(`git status`);
    const ahead = /Your branch is ahead of/.test(status);
    if (ahead) return true;
    const updated = /Your branch is up to date with/.test(status);
    if (updated) return true;
  },
  task: async () => await cmd(`git pull origin master`).catch(wtf)
});
