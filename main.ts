import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Why a zipper: it is the everyday object whose mechanism is most like a
// bridge — two separate banks joined tooth by tooth — yet whose failure mode
// (one slipped tooth unzips the whole thing) is the exact opposite of a
// bridge's, which is what makes the analogy both apt and honest.
const LINE1 =
  "A zipper is a tiny bridge-builder: a slider walks along two banks of metal teeth and locks their hands together, one pair at a time, until the gap is gone.";
const LINE2 =
  "It works because the teeth really do lock together, pair by pair, but it leaves out that a real bridge stays standing — a zipper can spring open the moment one tooth lets go.";

const entry = `${LINE1}\n${LINE2}\n`;

const lines = entry.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  if (line.trim().length === 0) {
    throw new Error(`line ${i + 1} is empty`);
  }
}
const charCount = [...entry.trimEnd()].length;
if (charCount < 1 || charCount > 400) {
  throw new Error(`entry must be 1-400 characters, got ${charCount}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${charCount} characters, 2 lines)`);
