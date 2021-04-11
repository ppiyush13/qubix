const WebpackRequireFrom = require('webpack-require-from');
const DynamicEntry = require('dynamic-entry-webpack-plugin');

export default ({ inputPath, buildPath, requireFrom }) => {
    return {
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
                return ![
                    //'HotModuleReplacementPlugin',
                ].includes(plugin.constructor.name);
            };

            return {
                ...config,
                entry: inputPath,
                output: {
                    ...config.output,
                    path: buildPath,
                    filename: 'main.js',
                    chunkFilename: '[name].[contenthash:8].chunk.js',
                },
                externals: {
                    'react': 'window["react"]',
                    'styled-components': 'window["styled-components"]',
                    'react-router-dom': 'window["react-router-dom"]'
                },
                plugins: [
                    ...config.plugins,
                    new WebpackRequireFrom({
                        variableName: requireFrom
                    }),
                    new DynamicEntry({
                        exportable: true,
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
        },

        paths: paths => {
            
            return {
                ...paths,
                appBuild: buildPath,
            }
        }
    }
};
