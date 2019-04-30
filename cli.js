const atocha = require("atocha");
const listr = require("listr");

const time = () => new Date().toISOString();

const tasks = new listr([
  {
    title: "Adding",
    task: async () => await atocha(`git add . -A`)
  },
  {
    title: "Commiting",
    task: async () => await atocha(`git commit -m "Commited on ${time()}"`)
  },
  {
    title: "Pulling from master",
    task: async () => await atocha(`git pull origin master`)
  },
  {
    title: "Pushing",
    task: async () => await atocha(`git push`)
  }
]);

tasks.run().catch(err => {
  console.error(err);
});
