import { readFileSync, writeFileSync } from "node:fs";
import { glob } from "glob";
import { importMap } from "./rollup.config.mjs";

// Replace URL imports to node modules
for (const file of glob.sync("./dist/*.d.ts")) {
    let contents = readFileSync(file, "utf8");

    for (const [origin, target] of Object.entries(importMap)) {
        contents = contents.replaceAll(origin, target);
    }

    writeFileSync(file, contents, "utf8");
}

// Emit package.json for Node ESM
writeFileSync("./dist/package.json", `{"type":"module"}`);

// Emit package.json for CommonJS
writeFileSync("./cjs/package.json", `{"type":"commonjs"}`);
