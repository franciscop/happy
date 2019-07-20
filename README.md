# Happy

Happy save and don't worry about anything. Simplify your day-to-day Git workflow:

```
happy save
```

<img width="400px" src="./img/happy.png" alt="screenshot" />

Basically, does these:

```bash
git add . -A
git commit -m "Commited on ${time()}"
git pull origin master
git push
```

Read the `index.js`, since this is a very alpha package and will change.
