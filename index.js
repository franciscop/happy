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
  test,
} = require("./src/index.js");

const { flags, input } = meow(
  `
  Usage
    $ happy
    $ happy "Message here"

  Options
    --now                Skip building, linting and testing to deploy it now
    --publish VERSION    Publish your package to NPM with "np VERSION --yolo"
    --patch              Alias for --publish patch
    --minor              Alias for --publish minor
    --major              Alias for --publish major

  Examples
    $ happy
    ✔ Building project
    ↓ Linting
    ✔ Testing project
    ✔ Saving changes
    ✔ Downloading latest
    ✔ Uploading changes

    $ happy "Move the dates to ISO 8601"
    ✔ Building project
    ↓ Linting
    ✔ Testing project
    ✔ Saving changes
    ✔ Downloading latest
    ✔ Uploading changes
`,
  {
    flags: {
      now: {
        type: "boolean",
        alias: "n",
      },
      publish: {
        type: "string",
        alias: "p",
      },
      patch: {
        type: "boolean",
      },
      minor: {
        type: "boolean",
      },
      major: {
        type: "boolean",
      },
    },
  }
);

const action = [save, pull, push];

if (!flags.now) {
  action.unshift(build, lint, test);
}

if (flags.patch && !flags.publish) {
  flags.publish = "patch";
}
if (flags.minor && !flags.publish) {
  flags.publish = "minor";
}
if (flags.major && !flags.publish) {
  flags.publish = "major";
}
if (flags.publish) {
  action.push(publish);
}

const tasks = new listr(action.map((task) => task({ flags, input })));

analyze()
  .then((ctx) => tasks.run(ctx))
  .catch((error) => console.error(error));
