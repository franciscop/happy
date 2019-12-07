#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");
const meow = require("meow");
const {
  analyze,
  build,
  lint,
  publish,
  pull,
  push,
  save,
  test
} = require("./src/index.js");

const cli = meow(
  `
  Usage
    $ happy
    $ happy "Message here"

  Options
    --publish VERSION    Publish your package to NPM with "np VERSION --yolo"
    --as NAME            [Not yet] save in a branch with that name
    --watch              [Not yet] rerun the command when there's a file change

  Examples
    $ happy
    ✔ Analyzing project
    ✔ Building project
    ✔ Linting
    ✔ Testing project
    ✔ Saving changes
    ✔ Downloading latest
    ✔ Uploading changes

    $ happy "Move the dates to ISO 8601"
    ✔ Analyzing project
    ✔ Building project
    ✔ Linting
    ✔ Testing project
    ✔ Saving changes
    ✔ Downloading latest
    ✔ Uploading changes
`,
  {
    flags: {
      publish: {
        type: "string",
        alias: "p"
      }
    }
  }
);

const action = [analyze, build, lint, test, save, pull, push];

if (cli.flags.publish) {
  action.push(publish);
}

const tasks = new listr(action.map(task => task(cli)));

tasks.run().catch(error => console.error);
