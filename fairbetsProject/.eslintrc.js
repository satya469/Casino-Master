// module.exports = {
//   env: {
//     browser: true,
//     es2021: true
//   },
//   extends: [
//     'plugin:react/recommended',
//     'standard'
//   ],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 12,
//     sourceType: 'module'
//   },
//   plugins: [
//     'react'
//   ],
//   rules: {
//   }
// }

module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    },
    allowImportExportEverywhere: true,
  },


  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    'max-len': 'off',
    camelcase: ['off', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
     // ES6
     'arrow-spacing': 'error',
     'no-confusing-arrow': 'error',
     'no-duplicate-imports': 'off',
     'no-var': 'off',
     'object-shorthand': 'error',
     'prefer-const': 'off',
     'prefer-template': 'error',
     "react-hooks/rules-of-hooks": "off",
  }
}
