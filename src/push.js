module.exports = {
  title: "Uploading changes",
  skip: async () => {
    const status = await atocha(`git status`);
    const hasCommited = /Your branch is ahead of/.test(status);
    if (!hasCommited) return true;
  },
  task: async () => await atocha(`git push`).catch(wtf)
};
