import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const placard =
  "Stapler, c. 2019. Ritual binding device; the scribe pressed it twice — once for the document, once to be sure. Gift of the Third Floor.";

// Gate guard: 1-180 Unicode code points, single line, not only whitespace.
const chars = [...placard].length;
if (chars < 1 || chars > 180) {
  throw new Error(`placard is ${chars} chars, outside the 1-180 gate`);
}
if (placard.includes("\n") || placard.includes("\r")) {
  throw new Error("placard must be a single line");
}
if (placard.trim().length === 0) {
  throw new Error("placard must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), placard, "utf8");
