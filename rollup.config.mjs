import path from "node:path";
import { readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import * as FRON from "fron";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

/** @type {import("ts-node").TsConfigOptions} */
const tsCfg = FRON.parse(readFileSync("./tsconfig.json", "utf8"));
/** @type {Record<string, string>} */
export const importMap = Object.keys((tsCfg.compilerOptions.paths ?? {})).reduce((record, id) => {
    // Replace the URLs to their node modules according to the **compilerOptions.paths**.
    record[id] = (tsCfg.compilerOptions.paths ?? {})[id][0];
    return record;
}, {});
/** @type {Record<string, string>} */
const importMapWeb = Object.keys((tsCfg.compilerOptions.paths ?? {})).reduce((record, id) => {
    if (id.endsWith(".ts") && id.startsWith("https://lib.deno.dev/x/ayonli_jsext@latest/")) {
        // Package **ayonli_jsext** comes with native ESM files for the browser,
        // so replace the URLs of .ts files to the equivalent ESM .js files.
        record[id] = id.replaceAll(
            "https://lib.deno.dev/x/ayonli_jsext@latest/",
            "https://lib.deno.dev/x/ayonli_jsext@latest/esm/"
        ).slice(0, -3) + ".js";
    } else {
        record[id] = id;
    }
    return record;
}, {});
const entries = Object.fromEntries(
    glob.sync("**/*.ts", {
        ignore: ["node_modules/**", "**/*.test.ts", "**/*.d.ts", "**/*-deno.ts"],
    }).map(file => [
        file.slice(0, file.length - path.extname(file).length),
        fileURLToPath(new URL(file, import.meta.url))
    ])
);

/** @type {import("rollup").RollupOptions[]} */
export default [
    { // CommonJS
        input: entries,
        output: {
            dir: "cjs",
            format: "cjs",
            exports: "named",
            interop: "auto",
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: ".",
        },
        external(id) {
            return String(id).includes("node_modules");
        },
        plugins: [
            replace({ ...importMap, preventAssignment: true }),
            typescript({
                moduleResolution: "bundler",
                baseUrl: "", // must reset this
            }),
            resolve({ preferBuiltins: true }),
            commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
        ],
    },
    { // ES Module for Node.js
        input: entries,
        output: {
            dir: "dist",
            format: "esm",
            exports: "named",
            interop: "auto",
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: ".",
        },
        external(id) {
            return String(id).includes("node_modules");
        },
        plugins: [
            replace({ ...importMap, preventAssignment: true }),
            typescript({
                moduleResolution: "bundler",
                compilerOptions: {
                    baseUrl: "", // must reset this
                    declaration: true,
                    declarationDir: "dist",
                },
                exclude: [
                    "*.test.ts",
                    "*-deno.ts"
                ]
            }),
            resolve({ preferBuiltins: true }),
            commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
        ],
    },
    { // ES Module for Web
        input: entries,
        output: {
            dir: "esm",
            format: "esm",
            interop: "auto",
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: ".",
        },
        external(id) {
            return String(id).startsWith("https://");
        },
        plugins: [
            replace({ ...importMapWeb, preventAssignment: true }),
            typescript({ moduleResolution: "bundler" }),
            resolve({ preferBuiltins: true }),
            commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
        ],
    },
];
