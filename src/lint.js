const cmd = require("atocha");
const { read } = require("files");

let linter;

module.exports = cli => ({
  title: "Linting",
  skip: async () => {
    linter = null;
    const pack = await read("package.json");
    linter = JSON.parse(pack).scripts.linter;
    if (!linter) return true;
  },
  task: async () => {
    return await cmd(linter);
  }
});
