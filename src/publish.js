import cmd from "atocha";

export default (cli) => ({
  title: "Publish to npm",
  skip: async () => {
    if (!cli.flags.publish) return true;
    // 5.0.0
    if (!/^\d+\.\d+\.\d+$/.test(await cmd(`np --version`))) {
      throw new Error('Need `np` installed, please run "npm install -g np"');
    }
    return false;
  },
  task: async () =>
    await cmd(`np ${cli.flags.publish} --yolo --no-release-draft`),
});
