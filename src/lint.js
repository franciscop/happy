const cmd = require("atocha");
const { read } = require("files");

module.exports = cli => ({
  title: "Linting",
  task: async () => {
    const pack = await read("package.json");
    const { scripts } = JSON.parse(pack);
    if (scripts.lint) {
      return await cmd(scripts.lint);
    }
    console.log("No lint");
  }
});
