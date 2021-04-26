const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy,
} = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1890ff" },
    },
  }),
  addDecoratorsLegacy()
);
