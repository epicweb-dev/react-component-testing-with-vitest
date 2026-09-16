/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
// 💣 Remove the `preview` provider import. You won't need it anymore.
import { preview } from '@vitest/browser-preview'
// 🐨 Import the `playwright` provider from '@vitest/browser-playwright'.
// 💰 import { foo } from 'bar'
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
			// 🐨 Replace the `preview` provider with the `playwright` provider.
			// 💰 provider: playwright(),
			provider: preview(),
			instances: [
				{
					browser: 'chromium',
				},
			],
		},
	},
})
