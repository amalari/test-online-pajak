module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://online-test-api.achilles.systems",
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
