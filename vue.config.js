module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          UNI_PLATFORM: JSON.stringify(process.env.UNI_PLATFORM)
        }
      })
    ]
  },
  transpileDependencies: ['@dcloudio/uni-ui']
} 