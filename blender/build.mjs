// Builds every procedural monument in blender/monuments/ into public/models/.
//
//   npm run models              # all monuments
//   npm run models -- taj_mahal # one monument
//
// Blender is located via $BLENDER, then PATH, then the default Windows install dir.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const monumentsDir = path.join(root, "blender", "monuments");

function findBlender() {
  if (process.env.BLENDER) return process.env.BLENDER;
  const winRoot = "C:\\Program Files\\Blender Foundation";
  if (existsSync(winRoot)) {
    const versions = readdirSync(winRoot).sort().reverse();
    for (const v of versions) {
      const exe = path.join(winRoot, v, "blender.exe");
      if (existsSync(exe)) return exe;
    }
  }
  return "blender";
}

const only = process.argv.slice(2);
const scripts = readdirSync(monumentsDir)
  .filter((f) => f.endsWith(".py"))
  .map((f) => f.replace(/\.py$/, ""))
  .filter((name) => only.length === 0 || only.includes(name));

const blender = findBlender();
for (const name of scripts) {
  const out = path.join(root, "public", "models", `${name.replace(/_/g, "-")}.glb`);
  console.log(`\n▸ ${name}`);
  execFileSync(
    blender,
    ["-b", "--factory-startup", "-P", path.join(monumentsDir, `${name}.py`), "--", "--out", out],
    { stdio: "inherit" }
  );
}
