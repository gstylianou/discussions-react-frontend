module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:react/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'max-len': [0],
    'no-unused-vars': [0],
    'require-jsdoc': [0],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    // 'react-hooks/rules-of-hooks': 'warn',
    // 'indent': [1],
  },
};
