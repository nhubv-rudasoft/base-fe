import nx from '@nx/eslint-plugin';
import prettierConfig from 'eslint-config-prettier'; // Kế thừa cấu hình Prettier
import prettierPlugin from 'eslint-plugin-prettier'; // Plugin Prettier
import reactPlugin from 'eslint-plugin-react'; // Plugin React
import reactHooksPlugin from 'eslint-plugin-react-hooks'; // Plugin React Hooks
import importPlugin from 'eslint-plugin-import'; // Plugin Import

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/react'],
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/coverage',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      prettier: prettierPlugin, // Prettier plugin
      '@nx': nx, // Nx plugin
      react: reactPlugin, // React plugin
      'react-hooks': reactHooksPlugin, // React Hooks plugin
      import: importPlugin, // Import plugin
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      ...prettierConfig.rules, // Kế thừa từ eslint-config-prettier để tắt các quy tắc xung đột
      'prettier/prettier': 'error', // Bật quy tắc prettier, báo lỗi nếu code không theo Prettier
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?js$', // Allow importing eslint configs
            '^@libs/.*', // Allow importing libs
          ],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      'react/react-in-jsx-scope': 'off', // React 17+ không cần import React
      'react/prop-types': 'off', // Tắt nếu dùng TypeScript, bật nếu dùng JS
      'react/jsx-uses-react': 'off', // React 17+ không cần
      'react/jsx-uses-vars': 'error', // Giữ để tránh lỗi unused vars trong JSX
      'react/jsx-no-undef': 'error', // Báo lỗi nếu dùng component chưa định nghĩa
      'react/jsx-pascal-case': 'error', // Component phải dùng PascalCase
      'react/no-unknown-property': 'error', // Báo lỗi nếu dùng thuộc tính HTML không hợp lệ
      'react-hooks/exhaustive-deps': 'warn', // Cảnh báo nếu thiếu dependency trong useEffect/useCallback
      'import/no-anonymous-default-export': 'warn', // Khuyến khích đặt tên export
      quotes: ['error', 'single'], // Thống nhất nháy đơn
      semi: ['error', 'always'], // Giữ chấm phẩy cho rõ ràng
      'no-unused-vars': 'error', // Bắt lỗi biến không dùng tới, rất hữu ích để giữ mã sạch.
      'import/order': 'error', // Sắp xếp import theo thứ tự (ví dụ: thư viện ngoài, thư viện nội bộ, file local) để dễ đọc.
      'react-hooks/rules-of-hooks': 'error', // Bắt buộc tuân thủ rules of hooks trong React.
      'object-curly-spacing': ['error', 'always'], // Thêm khoảng trắng trong object để dễ đọc.
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {},
  },
];
