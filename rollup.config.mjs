import path from "path";
import { glob } from "glob";
import { fileURLToPath } from "url";
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { builtinModules } from "module";

export default {
    input: Object.fromEntries(
        glob.sync('**/*.ts', { ignore: ['node_modules/**', "**/*.test.ts"] }).map(file => [
            file.slice(0, file.length - path.extname(file).length),
            fileURLToPath(new URL(file, import.meta.url))
        ])
    ),
    output: {
        dir: "esm",
        format: "es",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: (chunkInfo) => {
            if (chunkInfo.name.includes('node_modules')) {
                return chunkInfo.name.replace('node_modules', '_external') + '.js';
            }

            return '[name].js';
        }
    },
    plugins: [
        typescript({
            module: "esnext",
            outDir: "esm",
            declaration: false,
        }),
        resolve({ preferBuiltins: true }),
        commonjs({ ignore: builtinModules }),
    ],
};
