// Register each file as a corresponding Vuex module. Module nesting
// will mirror [sub-]directory hierarchy and modules are namespaced
// as the camelCase equivalent of their file name.

import camelCase from "lodash/camelCase";

const modulesCache = {};
const storeData = { modules: {} };

// ESM equivalent of require.context using import.meta.glob (Vite)
// NOTE: Since you're using Vue CLI + webpack, see the note below.
const moduleFiles = import.meta.glob("./**/*.js", { eager: true });

function updateModules() {
	for (const [fileName, moduleDefinition] of Object.entries(moduleFiles)) {
		// Skip index files and unit test files
		if (/index|\.unit\./.test(fileName)) continue;

		const resolvedModule = moduleDefinition.default || moduleDefinition;

		// Skip the module during hot reload if it refers to the
		// same module definition as the one we have cached.
		if (modulesCache[fileName] === resolvedModule) return;

		// Update the module cache, for efficient hot reloading.
		modulesCache[fileName] = resolvedModule;

		// Get the module path as an array.
		const modulePath = fileName
			// Remove the "./" from the beginning.
			.replace(/^\.\//, "")
			// Remove the file extension from the end.
			.replace(/\.\w+$/, "")
			// Split nested modules into an array path.
			.split(/\//)
			// camelCase all module namespaces and names.
			.map(camelCase);

		// Get the modules object for the current path.
		const { modules } = getNamespace(storeData, modulePath);

		// Add the module to our modules object.
		modules[modulePath.pop()] = {
			// Modules are namespaced by default.
			namespaced: true,
			...resolvedModule,
		};
	}

	// Hot reloading via Vite's import.meta.hot
	if (import.meta.hot) {
		import.meta.hot.accept((newModuleFiles) => {
			updateModules();
			import("../store").then((store) => {
				store.default.hotUpdate({ modules: storeData.modules });
			});
		});
	}
}

updateModules();

// Recursively get the namespace of a Vuex module, even if nested.
function getNamespace(subtree, path) {
	if (path.length === 1) return subtree;

	const namespace = path.shift();
	subtree.modules[namespace] = {
		modules: {},
		namespaced: true,
		...subtree.modules[namespace],
	};
	return getNamespace(subtree.modules[namespace], path);
}

export default storeData.modules;
