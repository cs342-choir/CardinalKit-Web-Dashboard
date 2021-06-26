module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/assets/styles/base/_settings.scss";
          `
        }
      }
    }
  };