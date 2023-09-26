import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { builtinModules } from "module";
// import { readFileSync } from "fs";
// const pkg = JSON.parse(readFileSync(path.resolve("./package.json"), "utf-8"));
// const external = Object.keys(pkg.dependencies || {});

export default {
    input: Object.fromEntries(
        glob.sync("**/*.ts", {
            ignore: ["node_modules/**", "**/*.test.ts", "**/*.d.ts"],
        }).map(file => [
            file.slice(0, file.length - path.extname(file).length),
            fileURLToPath(new URL(file, import.meta.url))
        ])
    ),
    output: {
        dir: "cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: ".",
        entryFileNames: (chunkInfo) => {
            if (chunkInfo.name.includes("node_modules")) {
                return chunkInfo.name.replace("node_modules", "external") + ".js";
            }

            return "[name].js";
        }
    },
    external(id) {
        return String(id).includes("node_modules");
    },
    plugins: [
        typescript({ moduleResolution: "bundler" }),
        resolve({ preferBuiltins: true }),
        commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
    ],
};
