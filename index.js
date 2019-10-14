#!/usr/bin/env node

const atocha = require("atocha");
const listr = require("listr");
const meow = require("meow");
const {
  analyze,
  lint,
  pull,
  push,
  save,
  start,
  test
} = require("./src/index.js");

const cli = meow(
  `
  Usage
    $ happy
    $ happy save
    $ happy save "Message here"

  Options
    --publish VERSION    call "np VERSION --yolo" afterwards
    --watch              [Not yet] rerun the command when there's a file change
    --as NAME            [Not yet] save in a branch with that name

  Examples
    $ happy save
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing

    $ happy save "Fixed that damn bug that killed the staging database"
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing
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

const [actionName = "save"] = cli.input;
console.log(cli.flags);

const actions = {
  lint: [analyze(cli), lint(cli)],
  start: [start(cli)],
  save: [save(cli), pull(cli), push(cli)],
  deploy: [lint(cli), test(cli), save(cli), pull(cli), push(cli)]
};

const action = actions[actionName];
if (!action) {
  const acts = Object.keys(actions)
    .map(act => `\n$ happy ${act}`)
    .join("");
  console.error(
    `No action named "${actionName}" found. Available actions are:${acts}
Run "happy --help" for more info`
  );
  process.exit(1);
}

const tasks = new listr(actions[actionName]);

tasks.run().catch(err => {
  console.error("ERROR:", err);
});
