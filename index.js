#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");

const time = () => new Date().toISOString();

const swear = require("swear");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

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
    task: async () =>
      await atocha(`git pull origin master`).catch(err => {
        // Accept this "error"
        if (/\* branch\s+master\s+-> FETCH_HEAD/.test(err.message)) return;
        throw err;
      })
  },
  {
    title: "Pushing",
    task: async () => await atocha(`git push`)
  }
]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
