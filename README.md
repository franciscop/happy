# Happy

Happy save to simplify your day-to-day git workflow:

```bash
$ happy
$ happy "Move the dates to ISO 8601"
```

<img width="400px" src="https://raw.githubusercontent.com/franciscop/happy/master/img/happy.png" alt="screenshot" />

## Getting started

First install it globally:

```bash
npm install happy -g
```

Then you can run it in your console, either with just `happy` or with `happy "Message"`. Run `happy --help` anytime:

```bash
$ happy --help

  Happy save to simplify your day-to-day git workflow

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
```


## What it does

It makes sure your project is ready to deploy, and then deploy it. For this, these are the steps:

- "Analyzing project": it will read the `package.json` and gather some meta information about the current project used later.
- "Building project": run `npm run build` *if* the `"build"` script is found in your `package.json`.
- "Linting": run `npm run lint` *if* the `"lint"` script is found in the project `package.json`.
- "Testing project": run `npm test` *if* the `"test"` script is found in the project `package.json`.
- "Saving changes": add all of the files with git, equivalent to `git add . && git commit -m "Saved on $TIME"`. Provide a message for a custom git message.
- "Downloading latest": git pull
- "Uploading changes": git push
- "Publish to npm": _only_ if the `--publish` flag is passed, publish it to npm.


Run it with a string to use it as a commit string:

```bash
happy "Added that new cool feature"
```

Add a `--publish VERSION` flag to publish the current package to npm with [np](https://github.com/sindresorhus/np#readme):

```bash
happy --publish patch
happy --publish minor
happy --publish major

happy --publish 5.0.0
```

## Upcoming

Upcoming flags:

- `--as BRANCH`: put everything into a branch before pushing to origin. Allows for the common pattern of creating PRs from branches to master.
- `--watch` (maybe): keep it in watch mode and save as you go. If combined with `--as`, keep pushing all your changes to that branch.
- Other? Please let me know in [the issues for any feature request](https://github.com/franciscop/happy/issues).

Upcoming features in order of execution:

- If a `"lint"` script is found in your `package.json`, run the linter specified there before saving. Errors will abort publishing.
- If a `"test"` script is found in your `package.json`, run the test script before saving. Errors will abort publishing.
- If a `"build"` script is found in your `package.json`, run the build scrip before saving. Errors will abort publishing.
- Other? Please let me know in [the issues for any feature request](https://github.com/franciscop/happy/issues).
