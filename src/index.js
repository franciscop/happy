#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");
const meow = require("meow");

const pull = require("./pull.js");
const push = require("./push.js");
const save = require("./save.js");

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

console.log(cli);
// const tasks = new listr([save, pull, push]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
