#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");

const time = () => new Date().toISOString().replace(/\.[0-9]{3}/, "");

// Accept these errors
const wtf = err => {
  if (/nothing to commit, working tree clean/.test(err.message)) return;
  if (/branch\s+master\s+-> FETCH_HEAD/.test(err.message)) return;
  if (/master -> master/.test(err.message)) return;
  if (/Everything up-to-date/.test(err.message)) return;
  throw err;
};

const tasks = new listr([
  {
    title: "Adding",
    task: async () => await atocha(`git add . -A`)
  },
  {
    title: "Commiting",
    task: async () =>
      await atocha(`git commit -m "Saved on ${time()}" || echo "Already saved"`)
  },
  {
    title: "Pushing",
    task: async () => await atocha(`git push`).catch(wtf)
  },
  {
    title: "Pulling from master",
    task: async () => await atocha(`git pull origin master`).catch(wtf)
  }
]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
