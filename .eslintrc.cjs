module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended' // 解决ESlint和Prettier冲突
  ],
  overrides: [],
  // 配置支持 vue 和 ts
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用该any类型。
    '@typescript-eslint/no-unused-vars': 'off', //禁止未使用的变量
    'vue/valid-template-root': 'off',
    'vue/no-v-html': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
    endOfLine: 'off', // 添加忽略换行格式的检查。
    'vue/require-default-prop': 'off' // props 需要设置默认值
  }
}
