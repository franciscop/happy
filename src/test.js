const cmd = require("atocha");
const { read } = require("files");

let test;

module.exports = cli => ({
  title: "Linting",
  skip: async () => {
    test = null;
    const pack = await read("package.json");
    test = JSON.parse(pack).scripts.test;
    if (!test) return "No `test` script found";
  },
  task: async () => {
    return await cmd(test);
  }
});
