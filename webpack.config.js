const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ]
    },
    devServer: {
        static: "./dist",
    },
}