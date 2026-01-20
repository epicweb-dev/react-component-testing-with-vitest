/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
// 🐨 Import `configDefaults` from `vitest/config`
// 💰 import { foo } from 'bar'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : undefined,
	},
	// 🐨 Add a new property called `projects`.
	// As the value, provide an array with two entries.
	// 💰 test: { projects: [{}, {}] }
	//
	// 🐨 In the first entry of the `projects` array,
	// define a `test` property and give it a `test.name` equal to "unit".
	// 💰 { test: { name: 'unit' } }
	//
	// 🐨 In the unit test project, set `globals` to true
	// and `environment` to "node".
	// 💰 globals: true
	// 💰 environment: 'node'
	//
	// 🐨 Add the `include` property and set it to an array
	// with the only entry "**/*.test.ts".
	//
	// 🐨 Since "**/*.test.ts" will match ALL tests, exclude
	// the browser tests by providing the `exclude` property
	// and including the browser test pattern there.
	// 🦉 Vitest projects override the default configuration,
	// which means that the `exclude` array must include the
	// default values to ignore tests from `node_modules`, for example.
	// 💰 exclude: [...defaultConfig.exclude, '**/*.browser.test.ts(x)?']
	//
	// Now, switch to the second entry in the `projects` array.
	// 🐨 First, set the `extends` property to `true`. Let's extend the
	// root-level options, like `plugins` to have consistent behavior in prod and tests.
	// 💰 { extends: true, test: {} }
	//
	// 🐨 Next, add these properties to the `test` in this project:
	// {
	//   name: "browser",
	//   globals: true,
	//   include: ["**/*.browser.test.ts(x)?"]
	// }
	//
	// 🐨 Finally, copy the existing `browser` configuration
	// under the `test` property of the second project.
	// 💰 { test: { name: 'browser', browser: {...} }}
	//
	// 💣 Delete this root-level `test` property altogether.
	test: {
		globals: true,
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
})
