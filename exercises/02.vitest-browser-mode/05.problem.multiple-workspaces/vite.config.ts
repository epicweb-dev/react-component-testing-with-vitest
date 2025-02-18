/// <reference types="vitest" />
import { defineConfig } from 'vite'
// 🐨 Import `defaultConfig` from `vitest/config`
// 💰 import { foo } from 'bar'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	// 🐨 Add a new property called `workspace`.
	// As the value, provide an array with two entries.
	// 💰 workspace: [{}, {}]
	//
	// 🐨 In the first entry of the `workspace` array,
	// define a `test` property and give it a `test.name` equal to "unit".
	// 💰 { test: { name: 'unit' } }
	//
	// 🐨 In the unit test workspace, set `globals` to true
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
	// 🦉 Vitest workspaces override the default configuration,
	// which means that the `exclude` array must include the
	// default values to ignore tests from `node_modules`, for example.
	// 💰 exclude: [...defaultConfig.exclude, '**/*.browser.test.ts(x)?']
	//
	// 🐨 Now, switch to the second entry in the `workspace`
	// array. There, give it the following properties:
	// {
	//   name: "browser",
	//   globals: true,
	//   include: ["**/*.browser.test.ts(x)?"]
	// }
	//
	// 🐨 At the root-level of the browser workspace object
	// set the `extends` property to true. This will use the
	// root-level plugins, like `react()`, for browser tests.
	//
	// 🐨 Finally, copy the existing `browser` configuration
	// under the `test` property of the second workspace.
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
