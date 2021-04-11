var path = require('path');
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
            entry: './start/Starter.js',
            output: {
                ...config.output,
                path: entryPath,
                filename: 'main.js',
                chunkFilename: '[name].[contenthash:8].chunk.js',
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
            optimization: {
                ...config.optimization,
                runtimeChunk: false,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'async',
                        },
                    },
                },
            },
        };

        console.log(overirdedConfigs);

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
