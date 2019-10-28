/**  〔ESLint抑制論証〕 Webpackに構成されるファイルではないので, requireでしかインポート出来ない。 */
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

const Path = require("path");
const Webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");


module.exports = (env, argv) => {

  const IS_DEVELOPMENT_BUILD_MODE = argv.mode === "development";
  const IS_PRODUCTION_BUILD_MODE = argv.mode === "production";
  const SOURCE_CODE_ROOT_DIRECTORY_ABSOLUTE_PATH = Path.resolve(__dirname, "Source");

  /* --- 共通Webpack値 ----------------------------------------------------------------------------------------------- */
  const WebpackCommonSettings = {

    mode: argv.mode,
    context: SOURCE_CODE_ROOT_DIRECTORY_ABSOLUTE_PATH,
    watch: IS_DEVELOPMENT_BUILD_MODE,

    get resolve() {
      return {
        extensions: [ ".ts", ".js" ],
        alias: {
          vue: "vue/dist/vue.common.js",
          "@SourceFiles:Root": SOURCE_CODE_ROOT_DIRECTORY_ABSOLUTE_PATH,
          "@Store": Path.resolve(SOURCE_CODE_ROOT_DIRECTORY_ABSOLUTE_PATH, "Store"),
        }
      };
    },

    get module() {
      return {
        rules: [
          {
            test: /\.ts$/u,
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [ /\.vue$/u ],
              transpileOnly: true
            }
          }
        ]
      };
    },

    get optimization() {
      return {
        noEmitOnErrors: false,
        minimize: IS_PRODUCTION_BUILD_MODE
      };
    }
  };


  return [
    {
      name: "Main",

      context: WebpackCommonSettings.context,
      entry: {
        index: "./EntryPoint.ts"
      },

      output: {
        path: __dirname,
        filename: "[name].js"
      },

      mode: WebpackCommonSettings.mode,
      watch: WebpackCommonSettings.watch,
      optimization: WebpackCommonSettings.optimization,

      module: {
        rules: [
          ...WebpackCommonSettings.module.rules,
          {
            test: /\.vue$/u,
            loader: "vue-loader"
          },
          {
            test: /\.pug$/u,
            oneOf: [
              {
                resourceQuery: /^\?vue/u,
                use: [ "pug-plain-loader" ]
              },
              {
                use: [ "html-loader", "pug-html-loader" ]
              }
            ]
          },
          {
            test: /\.styl(?:us)?$/u,
            use: [
              "vue-style-loader",
              "css-loader",
              "stylus-loader"
            ]
          }
        ]
      },

      resolve: {
        extensions: WebpackCommonSettings.resolve.extensions,
        alias: WebpackCommonSettings.resolve.alias
      },

      plugins: [
        new Webpack.DefinePlugin({
          IS_DEVELOPMENT_BUILD_MODE,
          IS_PRODUCTION_BUILD_MODE
        }),
        new ForkTsCheckerWebpackPlugin({
          tsconfig: Path.resolve(__dirname, "tsconfig.json"),
          vue: true
        }),
        new VueLoaderPlugin()
      ]
    }
  ];
};
