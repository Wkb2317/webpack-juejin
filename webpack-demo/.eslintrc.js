module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: {
      // ES 其他特性
      jsx: true, // 如果是 React 项目，就需要开启 jsx 语法
    },
  },
  // 具体检查规则
  extends: ["eslint:recommended"],
  // 具体检查规则
  rules: {
    // "no-unused-vars": 0,
  },
};
