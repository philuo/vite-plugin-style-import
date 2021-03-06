var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true });
var __export = (target, all) => {
    for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
    if (module2 && typeof module2 === 'object' || typeof module2 === 'function') {
        for (const key of __getOwnPropNames(module2))
            if (!__hasOwnProp.call(target, key) && (copyDefault || key !== 'default'))
                __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
    }
    return target;
};
var __toESM = (module2, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, 'default', !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module2, temp) => {
        return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
    };
})(typeof WeakMap !== 'undefined' ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
    AndDesignVueResolve: () => AndDesignVueResolve,
    AntdResolve: () => AntdResolve,
    ElementPlusResolve: () => ElementPlusResolve,
    NutuiResolve: () => NutuiResolve,
    VantResolve: () => VantResolve,
    VxeTableResolve: () => VxeTableResolve,
    default: () => src_default,
    getChangeCaseFileName: () => getChangeCaseFileName,
    transformImportVar: () => transformImportVar
});

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === 'undefined' ? new URL('file:' + __filename).href : document.currentScript && document.currentScript.src || new URL('main.js', document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var import_pluginutils = require('@rollup/pluginutils');
var changeCase = __toESM(require('change-case'));
var import_es_module_lexer = require('es-module-lexer');
var import_magic_string = __toESM(require('magic-string'));
var import_path2 = __toESM(require('path'));
var import_fs2 = __toESM(require('fs'));
var import_debug = __toESM(require('debug'));

// src/utils.ts
var import_path = __toESM(require('path'));
var import_vite = require('@yuo/vite');
var import_fs = __toESM(require('fs'));
var import_module = require('module');
function resolveNodeModules(libName, ...dir) {
    const esRequire = (0, import_module.createRequire)(importMetaUrl);
    let modulePath = '';
    try {
        modulePath = (0, import_vite.normalizePath)(esRequire.resolve(libName));
    } catch (error) {
        modulePath = (0, import_vite.normalizePath)(require.resolve(libName));
    }
    const lastIndex = modulePath.lastIndexOf(libName);
    return (0, import_vite.normalizePath)(import_path.default.resolve(modulePath.substring(0, lastIndex), ...dir));
}
function resolvePnp(module2) {
    try {
        return (0, import_vite.normalizePath)(require.resolve(module2));
    } catch (error) {
        return '';
    }
}
var isPnp = !!process.versions.pnp;
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}
function fileExists(f) {
    try {
        import_fs.default.accessSync(f, import_fs.default.constants.W_OK);
        return true;
    } catch (error) {
        return false;
    }
}

// src/resolve/antd.ts
function AntdResolve() {
    return {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
        }
    };
}

// src/resolve/antdv.ts
function AndDesignVueResolve() {
    return {
        ensureStyleFile: true,
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
        }
    };
}

// src/resolve/elementPlus.ts
function ElementPlusResolve() {
    return {
        libraryName: 'element-plus',
        ensureStyleFile: true,
        esModule: true,
        resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
        },
        resolveComponent: (name) => {
            return `element-plus/es/components/${name.replace(/^el-/, '')}/index.mjs`;
        },
        base: 'element-plus/theme-chalk/base.css'
    };
}

// src/resolve/vant.ts
function VantResolve() {
    return {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => {
            return `vant/es/${name}/style`;
        }
    };
}

// src/resolve/nutui.ts
function NutuiResolve() {
    return {
        libraryName: '@nutui/nutui',
        libraryNameChangeCase: 'pascalCase',
        resolveStyle: (name) => {
            return `@nutui/nutui/dist/packages/${name}/index.scss`;
        }
    };
}

// src/resolve/vxeTable.ts
function VxeTableResolve() {
    return {
        ensureStyleFile: true,
        libraryName: 'vxe-table',
        esModule: true,
        resolveStyle: (name) => {
            return `vxe-table/es/${name}/style.css`;
        }
    };
}

// src/index.ts
var debug = (0, import_debug.default)('@yuo/vite-plugin-style-import');
var ensureFileExts = ['.css', '.js', '.scss', '.less', '.styl'];
var asRE = /\s+as\s+\w+,?/g;
var isFn = (value) => value != null && Object.prototype.toString.call(value) === '[object Function]';
var src_default = (options) => {
    const {
        include = ['**/*.vue', '**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],
        exclude = 'node_modules/**',
        resolves = []
    } = options;
    let { libs = [] } = options;
    libs = [...libs, ...resolves];
    const filter = (0, import_pluginutils.createFilter)(include, exclude);
    let needSourcemap = false;
    let isBuild = false;
    let external;
    debug('plugin options:', options);
    return {
        name: 'vite:style-import',
        enforce: 'post',
        configResolved(resolvedConfig) {
            var _a, _b, _c;
            needSourcemap = !!resolvedConfig.build.sourcemap;
            isBuild = resolvedConfig.isProduction || resolvedConfig.command === 'build';
            external = (_c = (_b = (_a = resolvedConfig == null ? void 0 : resolvedConfig.build) == null ? void 0 : _a.rollupOptions) == null ? void 0 : _b.external) != null ? _c : void 0;
            debug('plugin config:', resolvedConfig);
        },
        async transform(code, id) {
            if (!code || !filter(id) || !needTransform(code, libs)) {
                return null;
            }
            await import_es_module_lexer.init;
            let imports = [];
            try {
                imports = (0, import_es_module_lexer.parse)(code)[0];
                debug('imports:', imports);
            } catch (e) {
                debug('imports-error:', e);
            }
            if (!imports.length) {
                return null;
            }
            let s;
            const str = () => s || (s = new import_magic_string.default(code));
            for (let index = 0; index < imports.length; index++) {
                const { n, se, ss } = imports[index];
                if (!n)
                    continue;
                const lib = getLib(n, libs, external);
                if (!lib)
                    continue;
                const isResolveComponent = isBuild && !!lib.resolveComponent;
                const importStr = code.slice(ss, se);
                let importVariables = transformImportVar(importStr);
                importVariables = filterImportVariables(importVariables, lib.importTest);
                const importCssStrList = await transformComponentCss(lib, importVariables);
                let compStrList = [];
                let compNameList = [];
                if (isResolveComponent) {
                    const { componentStrList, componentNameList } = transformComponent(lib, importVariables);
                    compStrList = componentStrList;
                    compNameList = componentNameList;
                }
                debug('prepend import css str:', importCssStrList.join(''));
                debug('prepend import component str:', compStrList.join(''));
                const { base = '' } = lib;
                let baseImporter = base ? `
import '${base}'` : '';
                if (str().toString().includes(base)) {
                    baseImporter = '';
                }
                const endIndex = se + 1;
                if (isResolveComponent && compNameList.some((item) => importVariables.includes(item))) {
                    if (lib.libraryName === 'element-plus') {
                        str().remove(ss, endIndex);
                    } else {
                        const importStr2 = str().slice(ss, endIndex);
                        const [resultStr, uncssList] = await removeAlreadyName(importStr2, lib);
                        if (resultStr) {
                            str().overwrite(ss, endIndex, resultStr);
                        } else {
                            str().remove(ss, endIndex);
                        }
                        if (uncssList.length) {
                            compStrList = compStrList.filter((item) => !uncssList.some((imp) => item.startsWith(`import ${imp}`)));
                        }
                    }
                }
                str().prependRight(endIndex, `${baseImporter}
${compStrList.join('')}${importCssStrList.join('')}`);
            }
            return {
                map: needSourcemap ? str().generateMap({ hires: true }) : null,
                code: str().toString()
            };
        }
    };
};
function filterImportVariables(importVars, reg) {
    if (!reg) {
        return importVars;
    }
    return importVars.filter((item) => reg.test(item));
}
async function removeAlreadyName(importStr, lib) {
    let result = importStr;
    const { libraryNameChangeCase = 'paramCase', resolveStyle, libraryName } = lib;
    const exportStr = importStr.replace(asRE, ',').replace('import', 'export').replace(asRE, ',');
    await import_es_module_lexer.init;
    const importComponents = (0, import_es_module_lexer.parse)(exportStr)[1];
    const hasCssList = [];
    const unCssList = [];
    importComponents.filter((comp) => {
        const name = getChangeCaseFileName(comp, libraryNameChangeCase);
        const importStr2 = resolveStyle == null ? void 0 : resolveStyle(name);
        if (importStr2) {
            const cssFile = resolveNodeModules(libraryName, importStr2);
            if (import_fs2.default.existsSync(cssFile)) {
                hasCssList.push(comp);
            } else {
                unCssList.push(comp);
            }
        } else {
            unCssList.push(comp);
        }
    });
    hasCssList.forEach((item) => {
        result = result.replace(new RegExp(`\\s?${item}\\s?,?`), '');
    });
    if ((0, import_es_module_lexer.parse)(result.replace('import', 'export'))[1].length === 0) {
        result = '';
    }
    return [result, unCssList];
}
async function transformComponentCss(lib, importVariables) {
    const {
        libraryName,
        resolveStyle,
        esModule,
        libraryNameChangeCase = 'paramCase',
        ensureStyleFile = false
    } = lib;
    if (!isFn(resolveStyle) || !libraryName) {
        return [];
    }
    const set = /* @__PURE__ */ new Set();
    for (let index = 0; index < importVariables.length; index++) {
        const name = getChangeCaseFileName(importVariables[index], libraryNameChangeCase);
        let importStr = resolveStyle(name);
        if (!importStr) {
            continue;
        }
        let isAdd = true;
        if (isPnp) {
            importStr = resolvePnp(importStr);
            isAdd = !!importStr;
        } else {
            if (esModule) {
                importStr = resolveNodeModules(libraryName, importStr);
            }
            if (ensureStyleFile) {
                isAdd = ensureFileExists(libraryName, importStr, esModule);
            }
        }
        isAdd && set.add(`import '${importStr}';
`);
    }
    debug('import css sets:', set.toString());
    return Array.from(set);
}
function transformComponent(lib, importVariables) {
    const {
        libraryName,
        resolveComponent,
        libraryNameChangeCase = 'paramCase',
        transformComponentImportName
    } = lib;
    if (!isFn(resolveComponent) || !libraryName) {
        return {
            componentStrList: [],
            componentNameList: []
        };
    }
    const componentNameSet = /* @__PURE__ */ new Set();
    const componentStrSet = /* @__PURE__ */ new Set();
    for (let index = 0; index < importVariables.length; index++) {
        const libName = importVariables[index];
        const name = getChangeCaseFileName(importVariables[index], libraryNameChangeCase);
        const importStr = resolveComponent(name);
        const importLibName = isFn(transformComponentImportName) && transformComponentImportName(libName) || libName;
        componentStrSet.add(`import ${importLibName} from '${importStr}';
`);
        componentNameSet.add(libName);
    }
    debug('import component set:', componentStrSet.toString());
    return {
        componentStrList: Array.from(componentStrSet),
        componentNameList: Array.from(componentNameSet)
    };
}
function transformImportVar(importStr) {
    if (!importStr) {
        return [];
    }
    const exportStr = importStr.replace('import', 'export').replace(asRE, ',');
    let importVariables = [];
    try {
        importVariables = (0, import_es_module_lexer.parse)(exportStr)[1];
        debug('importVariables:', importVariables);
    } catch (error) {
        debug('transformImportVar:', error);
    }
    return importVariables;
}
function ensureFileExists(libraryName, importStr, esModule = false) {
    const extName = import_path2.default.extname(importStr);
    if (!extName) {
        return tryEnsureFile(libraryName, importStr, esModule);
    }
    if (esModule) {
        return fileExists(importStr);
    }
    return true;
}
function tryEnsureFile(libraryName, filePath, esModule = false) {
    const filePathList = ensureFileExts.map((item) => {
        const p = `${filePath}${item}`;
        return esModule ? p : resolveNodeModules(libraryName, p);
    });
    return filePathList.some((item) => fileExists(item));
}
function getLib(libraryName, libs, external) {
    let libList = libs;
    if (external) {
        const isString = typeof external === 'string';
        const isRE = isRegExp(external);
        if (isString) {
            libList = libList.filter((item) => item.libraryName !== external);
        } else if (isRE) {
            libList = libList.filter((item) => !external.test(item.libraryName));
        } else if (Array.isArray(external)) {
            libList = libList.filter((item) => {
                return !external.some((val) => {
                    if (typeof val === 'string') {
                        return val === item.libraryName;
                    }
                    return val.test(item.libraryName);
                });
            });
        }
    }
    return libList.find((item) => item.libraryName === libraryName);
}
function getChangeCaseFileName(importedName, libraryNameChangeCase) {
    try {
        return changeCase[libraryNameChangeCase](importedName);
    } catch (error) {
        return importedName;
    }
}
function needTransform(code, libs) {
    return !libs.every(({ libraryName }) => {
        return !new RegExp(`('${libraryName}')|("${libraryName}")`).test(code);
    });
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    AndDesignVueResolve,
    AntdResolve,
    ElementPlusResolve,
    NutuiResolve,
    VantResolve,
    VxeTableResolve,
    getChangeCaseFileName,
    transformImportVar
});
