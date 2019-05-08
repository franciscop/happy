#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");
const meow = require("meow");

const cli = meow(`
  Usage
    $ grr
    $ grr "Message here"

  Options
    No available options

  Examples
    $ grr
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing

    $ grr "Fixed that damn bug that killed the staging database"
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing
`);

const time = () => new Date().toISOString().replace(/\.[0-9]{3}/, "");

// Accept these errors
const wtf = err => {
  if (/branch\s+master\s+-> FETCH_HEAD/.test(err.message)) return;
  if (/master -> master/.test(err.message)) return;
  if (/Everything up-to-date/.test(err.message)) return;
  throw err;
};

const save = {
  title: "Saving changes",
  skip: async () => {
    const status = await atocha(`git status`);
    const hasEdited = /Changes not staged for commit/.test(status);
    const hasUncommited = /Changes to be committed/.test(status);
    if (!hasEdited && !hasUncommited) return true;
  },
  task: async () => {
    const message = cli.input[0] || `Saved on ${time()}`;
    return await atocha(`git commit -am "${message}"`);
  }
};

const pull = {
  title: "Downloading latest version",
  task: async () => await atocha(`git pull origin master`).catch(wtf)
};

const push = {
  title: "Uploading changes",
  task: async () => await atocha(`git push`).catch(wtf)
};

const tasks = new listr([save, pull, push]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
