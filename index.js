#!/usr/bin/env node

// const atocha = require("atocha");
const listr = require("listr");

const time = () => new Date().toISOString();

const swear = require("swear");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const atocha = (command, buffer = 10) => {
  const maxBuffer = buffer * 1024 * 1024;
  return swear(
    exec(command, { maxBuffer }).then(out => {
      if (out.stderr) throw new Error(out.stderr);
      return out.stdout.trim();
    })
  );
};

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
        if (/up to date/.test(err.message)) return;
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
