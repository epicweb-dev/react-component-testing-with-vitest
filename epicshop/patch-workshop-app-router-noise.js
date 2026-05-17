import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const serverBuildPath = path.join(
	__dirname,
	'node_modules/@epic-web/workshop-app/build/server/index.js',
)

const actionFunction = `async function action$catchAllNotFound() {
  throw new Response("Not found", {
    status: 404
  });
}
`

async function patchServerBuild() {
	let source
	try {
		source = await fs.readFile(serverBuildPath, 'utf8')
	} catch (error) {
		if (error && typeof error === 'object' && 'code' in error) {
			if (error.code === 'ENOENT') {
				console.warn(
					`Skipping workshop app router patch: ${serverBuildPath} was not found.`,
				)
				return
			}
		}
		throw error
	}

	if (source.includes('action$catchAllNotFound')) {
		console.log('Workshop app router patch already applied.')
		return
	}

	const routeModuleBefore = `const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  default: $,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));`
	const routeModuleAfter = `const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  default: $,
  action: action$catchAllNotFound,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));`
	const manifestBefore = `"routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true`
	const manifestAfter = `"routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true`

	if (!source.includes(routeModuleBefore)) {
		throw new Error('Unable to find the root catch-all route module to patch.')
	}
	if (!source.includes(manifestBefore)) {
		throw new Error('Unable to find the root catch-all route manifest to patch.')
	}

	const patchedSource = source
		.replace(routeModuleBefore, routeModuleAfter)
		.replace(manifestBefore, manifestAfter)
		.replace('const $ = UNSAFE_withComponentProps', `${actionFunction}const $ = UNSAFE_withComponentProps`)

	await fs.writeFile(serverBuildPath, patchedSource)
	console.log('Patched workshop app catch-all route POST handling.')
}

await patchServerBuild()
