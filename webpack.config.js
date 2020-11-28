module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    devtool: "source-map",
    target: "node",
    // node: {
    //     process: false
    // },
    output: {
        path: __dirname + "/bundle",
        filename: "index.js",
        library: "@hyurl/utils",
        libraryTarget: "umd",
        globalObject: "this",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                options: {
                    configFile: __dirname + "/tsconfig.json"
                }
            }
        ]
    }
};
