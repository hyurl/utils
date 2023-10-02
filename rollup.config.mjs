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
import terser from "@rollup/plugin-terser";

const tsCfg = FRON.parse(readFileSync("./tsconfig.json", "utf8"));
const importMap = Object.keys((tsCfg.compilerOptions.paths ?? {})).reduce((record, id) => {
    record[id] = (tsCfg.compilerOptions.paths ?? {})[id][0];
    return record;
}, {});
const importMapEsm = Object.keys((tsCfg.compilerOptions.paths ?? {})).reduce((record, id) => {
    if (id.endsWith(".ts") && id.startsWith("https://deno.land/x/ayonli_jsext/")) {
        record[id] = id.replaceAll("https://deno.land/x/ayonli_jsext/", "https://deno.land/x/ayonli_jsext/esm/")
            .slice(0, -3) + ".js";
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
            typescript({ moduleResolution: "bundler", baseUrl: "" }),
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
                    baseUrl: "",
                    declaration: true,
                    declarationDir: "dist",
                },
                exclude: [
                    "*.test.ts"
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
            replace({ ...importMapEsm, preventAssignment: true }),
            typescript({ moduleResolution: "bundler", baseUrl: "" }),
            resolve({ preferBuiltins: true }),
            commonjs({
                ignoreDynamicRequires: true,
                ignore: builtinModules,
                esmExternals: (id) => {
                    return id.startsWith("@ayonli/jsext")
                        || id.includes("ayonli.github.io/jsext")
                        || id === "is-like"
                        || id.includes("is-like/index.js");
                },
            }),
        ],
    },
    { // Bundle
        input: "index.ts",
        output: {
            file: "bundle/index.js",
            format: "umd",
            name: "@hyurl/utils",
            sourcemap: true,
        },
        plugins: [
            replace({ ...importMap, preventAssignment: true }),
            typescript({ moduleResolution: "bundler" }),
            resolve({ preferBuiltins: true }),
            commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
            terser()
        ],
    },
];
