# gitrash

Just push everything. Install it and use it:

```
npm install gitrash -g
grr
```

![](./log.png)

This could easily be confused with "git trash", but since my lifehood depends on being employed I would never make that statement.

Basically, does these:

```bash
git add . -A
git commit -m "Commited on ${time()}"
git pull origin master
git push
```

Read the `index.js`, since this is a very alpha package and will change.
