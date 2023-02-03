// Analyze the project and find the right script for each thing
import { exists, read } from "files";

export default async (ctx) => {
  if (!(await exists("package.json"))) return {};
  const pkg = await read("package.json");
  return { pkg: JSON.parse(pkg) };
};
