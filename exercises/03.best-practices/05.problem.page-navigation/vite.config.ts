/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	test: {
		workspace: [
			{
				test: {
					name: 'unit',
					globals: true,
					include: ['**/*.test.ts'],
					exclude: [...configDefaults.exclude, '**/*.browser.test.ts(x)?'],
					environment: 'node',
				},
			},
			{
				extends: true,
				test: {
					name: 'browser',
					globals: true,
					include: ['**/*.browser.test.ts(x)?'],
					browser: {
						enabled: true,
						headless: true,
						provider: 'playwright',
						instances: [
							{
								browser: 'chromium',
								setupFiles: ['./vitest.browser.setup.ts'],
							},
						],
					},
				},
			},
		],
	},
})
