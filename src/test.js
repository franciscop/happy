const cmd = require("atocha");
const { read } = require("files");

let test = "jest";

module.exports = cli => ({
  title: "Testing",
  skip: async () => {
    test = "test";
    const pack = await read("package.json");
    test = JSON.parse(pack).scripts.test;
    if (!test) return "No `test` script found";
  },
  task: async () => {
    return await cmd(test);
  }
});
