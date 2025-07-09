// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
// reactRefresh is often for development only, ensure it doesn't cause issues in production builds if configured globally.
// This setup is fine for a standard Vite project.

export default [
  // Global ignores, you can keep your 'dist' ignore here if you want.
  // { ignores: ["dist/"] },

  // Configuration for your React source files
  {
    files: ['**/*.{js,jsx}'],
    // Note: The 'extends' property is deprecated in flat config.
    // The modern way is to spread the configs, but your syntax is still supported.
    // Let's stick to your syntax for consistency.
    plugins: {
        'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // =================================================================
  // === THIS IS THE NEW BLOCK THAT FIXES YOUR 'require' ERROR ===
  // =================================================================
  {
    files: ['tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.node, // Use Node.js globals for these config files
      },
    },
  },
];