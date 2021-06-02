module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': [
      'error',
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true
      }
    ],
    'max-len': [
      'error',
      {
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true
      }
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      // 'unix'
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'only-multiline',
        'objects': 'only-multiline',
      }
    ]
  }
};
