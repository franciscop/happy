#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");
const meow = require("meow");

const cli = meow(`
  Usage
    $ happy
    $ happy save
    $ happy save "Message here"

  Options
    No available options

  Examples
    $ happy
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing

    $ happy "Fixed that damn bug that killed the staging database"
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing
`);

// ISO 8601 without milliseconds (which is still ISO 8601)
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
    await atocha(`git add . -A`);
    return await atocha(`git commit -m "${message}"`);
  }
};

const pull = {
  title: "Downloading latest version",
  skip: async () => {
    const status = await atocha(`git status`);
    const ahead = /Your branch is ahead of/.test(status);
    if (ahead) return true;
    const updated = /Your branch is up to date with/.test(status);
    if (updated) return true;
  },
  task: async () => await atocha(`git pull origin master`).catch(wtf)
};

const push = {
  title: "Uploading changes",
  skip: async () => {
    const status = await atocha(`git status`);
    const hasCommited = /Your branch is ahead of/.test(status);
    if (!hasCommited) return true;
  },
  task: async () => await atocha(`git push`).catch(wtf)
};

const tasks = new listr([save, pull, push]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
