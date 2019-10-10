/*
 * @Description: file content
 * @Author: zy
 * @Date: 2019-10-03 14:16:32
 * @LastEditors: zy
 * @LastEditTime: 2019-10-10 15:03:23
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
