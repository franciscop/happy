# gitrash

Just push everything. This could easily be confused with "git trash", but I as I depend on being employed I would never make that statement :smile:

```
npx gitrash
```

Or, since you are gonna love it:

```
npm install gitrash -g
gr
```

Basically, does these:

```bash
git add . -A
git commit -m "Commited on ${time()}"
git pull origin master
git push
```

Read the `index.js`, since this is a very alpha package and will change.
