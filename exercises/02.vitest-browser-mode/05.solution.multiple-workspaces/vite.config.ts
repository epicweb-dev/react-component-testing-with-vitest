/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : undefined,
	},
	test: {
		projects: [
			{
				test: {
					name: 'unit',
					globals: true,
					environment: 'node',
					include: ['./src/**/*.test.ts'],
					exclude: [...configDefaults.exclude, 'src/**/*.browser.test.ts(x)?'],
				},
			},
			{
				extends: true,
				test: {
					name: 'browser',
					globals: true,
					include: ['./src/**/*.browser.test.ts(x)?'],
					browser: {
						enabled: true,
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
