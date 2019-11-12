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
    --as NAME            [Not yet] save in a branch with that name
    --watch              [Not yet] rerun the command when there's a file change

  Examples
    $ happy
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing

    $ happy "Move the dates to ISO 8601"
    ✔ Adding files
    ✔ Committing changes
    ✔ Pulling from master
    ✔ Pushing
```


## What it does

These are roughly the equivalent commands:

```bash
happy

# Similar to

git add . -A
git commit -m "Saved on ${time()}"
git pull origin master
git push
```

Run it with a string to use it as a commit string:

```bash
happy "Added that new cool feature"

# Similar to

git add . -A
git commit -m "Added that new cool feature"
git pull origin master
git push
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

- `--as BRANCH`: put everything into a branch before pushing to master. Allows for the common pattern of creating PRs from branches.
- `--watch` (maybe): keep it in watch mode and save as you go. If combined with `--as`, keep pushing all your changes to that branch.
- Other? Please let me know in [the issues for any feature request](https://github.com/franciscop/happy/issues).

Upcoming features in order of execution:

- If a `"lint"` script is found in your `package.json`, run the linter specified there before saving. Errors will abort publishing.
- If a `"test"` script is found in your `package.json`, run the test script before saving. Errors will abort publishing.
- If a `"build"` script is found in your `package.json`, run the build scrip before saving. Errors will abort publishing.
- Other? Please let me know in [the issues for any feature request](https://github.com/franciscop/happy/issues).
