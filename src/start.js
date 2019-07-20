const cmd = require("atocha");

module.exports = cli => ({
  title: "Project started",
  task: async () => await cmd(`npm run start`)
});
