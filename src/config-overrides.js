var path = require('path');
var fs = require('fs');
const WebpackRequireFrom = require('webpack-require-from');

module.exports = {
    devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            // Create the default config by calling configFunction with the proxy/allowedHost parameters
            const config = configFunction(proxy, allowedHost);
            return {
                ...config,
                hot: false,
                injectHot: false,
                injectClient: false,
            };
        };
    },

    webpack: function (config, env) {
        const validPlugins = (plugin) => {
            return !['HotModuleReplacementPlugin',].includes(plugin.constructor.name);
        }

        const entryPath = path.resolve(process.cwd(), 'micro-build');

        const overirdedConfigs = {
            ...config,
            entry: './src/App.jsx',
            output: {
                ...config.output,
                path: entryPath,
                filename: 'mf-bundle.js',
                chunkFilename: '[name].[contenthash:8].chunk.js',
                /* library: 'MF1',
                libraryTarget: 'umd',
                umdNamedDefine: true */
            },
            externals: {
                'react': 'react',
                'styled-components': 'StyledComponents',
                'react-router-dom': 'ReactRouter'
            },
            plugins: [
                ...config.plugins,
                new WebpackRequireFrom({
                    variableName: 'MICROFRONT_END_BASE_URL_MF1'
                }),
            ].filter(validPlugins),
            optimization: undefined,
            /* optimization: {
                ...config.optimization,
                runtimeChunk: false,
            }, */
        };

        console.log(config);

        return overirdedConfigs;
    },

    paths: paths => {
        //console.log(paths);

        return {
            ...paths,
            appBuild: 'E:\\node\\cra-external-import\\packages\\mf2\\micro-build'
        }
    }
};
