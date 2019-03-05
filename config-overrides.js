/* config-overrides.js */
const path = require("path");

module.exports = (config, env) => {
    config.resolve = {
        alias: {
            actions: path.resolve(__dirname, 'src/actions/'),
            components: path.resolve(__dirname, 'src/components/'),
            lib: path.resolve(__dirname, 'src/lib/'),
            reducers: path.resolve(__dirname, 'src/reducers/')
        }
    };
    return config;
}