module.exports = {
  title: "Saving changes",
  skip: async () => {
    const status = await atocha(`git status`);
    const hasEdited = /Changes not staged for commit/.test(status);
    const hasUncommited = /Changes to be committed/.test(status);
    if (!hasEdited && !hasUncommited) return true;
  },
  task: async () => {
    const message = cli.input[0] || `Saved on ${time()}`;
    await atocha(`git add . -A`);
    return await atocha(`git commit -m "${message}"`);
  }
};
