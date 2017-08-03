const PROJECT_PATH = __dirname + '/local_test'
/*module.exports = {
    entry: "./src/index.js",
    output: {
        library: 'FCC_Global',
        path: PROJECT_PATH + '/js',
        filename: "bundle.js"
    },
    /*entry: "./local_test/js/index.js",
    output: {
      path: "./local_test/js",
      filename: "inline.js"
    },*/
    /*module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }/*,
            {
                test: /\.vue$/,
                loader: 'vue-loader'/*,
                options: {
                  loaders: {
                  }
                  // other vue-loader options go here
                }*/
            //}
        /*]
    }/*,
    vue: {
      loaders: {
        js: 'babel-loader'
      }
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }*/
  /*}
};*/


module.exports = {
  entry: "./src/index.js",
  output: {
      library: 'FCC_Global',
      path: PROJECT_PATH + '/js',
      filename: "bundle.js"
  },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            } 
        ]
    }
};