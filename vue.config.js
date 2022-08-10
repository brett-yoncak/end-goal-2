/* eslint-disable */
module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/global.scss";
        `
      }
    }
  }
};
