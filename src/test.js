const cmd = require("atocha");
const { read } = require("files");

let test = "jest";

module.exports = cli => ({
  title: "Testing",
  skip: async () => {
    const pack = await read("package.json");
    test = JSON.parse(pack).scripts.test || "jest";
  },
  task: async () => {
    try {
      return await cmd(test);
    } catch (error) {
      return error.message;
    }
  }
});
