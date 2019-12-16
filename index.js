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
    --now                Skip building, linting and testing to deploy it now
    --as NAME            [Not yet] save in a branch with that name

  Examples
    $ happy
    ✔ Building project
    ✔ Linting
    ✔ Testing project
    ✔ Saving changes
    ✔ Downloading latest
    ✔ Uploading changes

    $ happy "Move the dates to ISO 8601"
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
      },
      now: {
        type: "boolean",
        alias: "n"
      }
    }
  }
);

const action = [save, pull, push];

if (!cli.flags.now) {
  action.unshift(build, lint, test);
}

if (cli.flags.publish) {
  action.push(publish);
}

const tasks = new listr(action.map(task => task(cli)));

analyze()
  .then(ctx => tasks.run(ctx))
  .catch(error => console.error(error));
