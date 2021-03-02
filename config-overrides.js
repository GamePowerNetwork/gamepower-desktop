module.exports = function override(webpackConfig) {
    webpackConfig.target = 'electron-renderer';
    webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
    });

    return webpackConfig;
}