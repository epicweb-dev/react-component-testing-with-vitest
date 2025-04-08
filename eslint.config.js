import defaultConfig from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	{
		rules: {
			// we leave unused vars around for the exercises
			'no-unused-vars': 'off',
			'import/order': 'off',
			'import/consistent-type-specifier-style': 'off',
			'vitest/no-standalone-expect': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
		},
	},
]
