module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
    es2020: true,
  },
  plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
