import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import { builtinModules } from "module";

export default {
    input: "index.ts",
    output: {
        file: "bundle/index.js",
        format: "umd",
        name: "@hyurl/utils",
        sourcemap: true,
    },
    plugins: [
        typescript({ moduleResolution: "bundler" }),
        resolve({ preferBuiltins: true }),
        commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
        terser()
    ],
};
