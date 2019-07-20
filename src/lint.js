import cmd from "atocha";
import { read } from "files";

export default async () => {
  const pack = await read("package.json");
  const { scripts } = JSON.parse(pack);
  console.log(scripts.lint);
};
