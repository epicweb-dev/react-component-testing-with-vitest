/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'
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
			// 🐨 Set a custom browser provider via the `provider` option.
			// 💰 provider: playwright(),
			instances: [
				{
					browser: 'chromium',
				},
			],
		},
	},
})
