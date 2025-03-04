import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        // External libraries
        gsap: 'readonly',
        AOS: 'readonly',
        bootstrap: 'readonly',
        Typed: 'readonly',
        // Functions from our codebase
        initNavbar: 'readonly',
        initTypedText: 'readonly',
        initPortfolioFilter: 'readonly',
        initSkillsProgress: 'readonly',
        initFormValidation: 'readonly',
        initScrollAnimations: 'readonly',
        initParallax: 'readonly',
        initHoverEffects: 'readonly',
        openProjectModal: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn', { 
        'varsIgnorePattern': '^init[A-Z]|^open',
        'argsIgnorePattern': '^_'
      }],
      'no-console': 'warn',
      'no-undef': 'error',
      'camelcase': 'warn',
      'max-len': ['warn', { 'code': 100 }],
      'prefer-const': 'warn'
    }
  }
];