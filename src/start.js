const cmd = require("atocha");

module.exports = {
  title: "Project started",
  task: async () => await cmd(`npm run start`)
};
