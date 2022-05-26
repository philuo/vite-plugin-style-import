# @yuo/vite-plugin-style-import

## @yuo/vite依赖插件

该插件可按需导入组件库样式

## 为什么只按需引入样式

由于 `vite` 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。

## 安装

**node version:** >=16.0.0

**@yuo/vite version:** >=1.0.0

```
npm i @yuo/vite-plugin-style-import -D
```

## 效果

```ts

import { Button } from 'ant-design-vue';

        ↓ ↓ ↓ ↓ ↓ ↓

import { Button } from 'ant-design-vue';
import 'ant-design-vue/lib/button/style/index.js';

```

```ts

import { ElButton } from 'element-plus';

        ↓ ↓ ↓ ↓ ↓ ↓

// dev
import { Button } from 'element-plus';
import 'element-plus/lib/theme-chalk/el-button.css`;

// prod
import Button from 'element-plus/lib/el-button';
import 'element-plus/lib/theme-chalk/el-button.css';

```

## 使用

- vite.config.ts 中的配置插件

```ts
import { UserConfigExport } from 'vite'
import styleImport, {
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve,
} from '@yuo/vite-plugin-style-import'

export default (): UserConfigExport => {
  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      styleImport({
        resolves:[
          AndDesignVueResolve(),
          VantResolve(),
          ElementPlusResolve(),
          NutuiResolve(),
          AntdResolve(),]
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            },
          },
        ],
      }),
    ],
  }
}
```

### 配置说明

| 参数     | 类型                                                           | 默认值                                           | 说明                        |
| -------- | -------------------------------------------------------------- | ------------------------------------------------ | --------------------------- |
| include  | `string 、 RegExp 、(string 、RegExp)[] 、null 、undefined`    | `['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx']` | 包含的文件格式              |
| exclude  | `string 、RegExp 、 (string 、 RegExp)[] 、 null 、 undefined` | `'node_modules/**'`                              | 排除的的文件/文件夹         |
| libs     | `Lib[]`                                                        | -                                                | 要导入的库列表              |
| resolves | `Lib[]`                                                        | -                                                | 要导入的库列表 (由插件内置) |

**Lib**

```ts
{
  // 符合该规则的导入名字才会生效，默认null，可以同时应用于resolveComponent和resolveStyle
  importTest?: Regexp;
  // 需要导入的库名
  libraryName: string;

  // 自定义样式转换
  resolveStyle: (name: string) => string ｜ string[];

  // 导出的名称转换格式
  // default: paramCase
  libraryNameChangeCase?: LibraryNameChangeCase;


  // 如果样式文件不是.css后缀。需要开启此选项
  // default:false
  esModule?: boolean;


   /**
   * 可能有些组件库不是很标准化。
   * 您可以打开此选项以忽略以确定文件是否存在。 导入不存在的CSS文件时防止错误。
   * 开启后性能可能会略有下降，但影响不大
   * default: false
   */
  ensureStyleFile?: boolean;

   // https://github.com/anncwb/vite-plugin-style-import/pull/5
  // 用于一些可能需要按需引入组件的情况,不单单只是引入样式(对Esm不能很好支持的库)
  // 仅在生产环境工作
  resolveComponent?: (name: string) => string;

  // https://github.com/anncwb/vite-plugin-style-import/issues/12
  // `import ${libName} from 'xxxx';`
  // Used for custom import name
  // 仅在生产环境工作
  transformComponentImportName?: (name: string) => string;
}

// LibraryNameChangeCase

export type LibraryNameChangeCase = ChangeCaseType | ((name: string) => string);

export type ChangeCaseType =
  | 'camelCase'
  | 'capitalCase'
  | 'constantCase'
  | 'dotCase'
  | 'headerCase'
  | 'noCase'
  | 'paramCase'
  | 'pascalCase'
  | 'pathCase'
  | 'sentenceCase'
  | 'snakeCase';


```

## License

MIT
