/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : undefined,
	},
	test: {
		globals: true,
		browser: {
			enabled: true,
			provider: 'playwright',
			instances: [
				{
					browser: 'chromium',
					// 🐨 Add the `setupFiles` property and include the path
					// to the "./vitest.browser.setup.ts" file.
					// 💰 setupFiles: [filePath]
				},
			],
		},
	},
})
