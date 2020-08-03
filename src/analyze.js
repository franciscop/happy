// Analyze the project and find the right script for each thing
const cmd = require("atocha");
const { exists, read } = require("files");

module.exports = async (ctx) => {
  if (!(await exists("package.json"))) return {};
  const pkg = await read("package.json");
  return { pkg: JSON.parse(pkg) };
};
