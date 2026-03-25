import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist");
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, ".build-ok"), "ok\n", "utf8");
