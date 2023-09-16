import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { builtinModules } from "module";

export default {
    input: 'index.js',
    output: {
        dir: "esm",
        format: "es",
        compact: true,
        sourcemap: true,
    },
    plugins: [
        resolve({ preferBuiltins: true }),
        commonjs({ ignoreDynamicRequires: true, ignore: builtinModules }),
    ],
};
