# Happy

Happy save and don't worry about anything. Simplify your day-to-day Git workflow:

```
happy
```

<img width="400px" src="https://raw.githubusercontent.com/franciscop/happy/master/img/happy.png" alt="screenshot" />

Basically, does these:

```bash
git add . -A
git commit -m "Commited on ${time()}"
git pull origin master
git push
```

Add a `--publish VERSION` flag to publish the current package to npm with [np](https://github.com/sindresorhus/np#readme):

```bash
happy --publish patch
happy --publish minor
happy --publish major
```

Read the `index.js`, since this is a very alpha package and will change.
