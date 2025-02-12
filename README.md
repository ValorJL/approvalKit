# 开发工具与依赖版本
开发工具：
Visual studio Code
Window系统
PowerShell

重要依赖：
vue: 3.5.13
eslint:9.20.1
prettier:^3.5.0
typescript:~5.7.2
vite:^6.1.0
vitest:^3.0.5

因为不同系统/开发工具/依赖版本可能有较大的配置过程差异，特此标注。


# 初始化
## 1. 初始化 Vue3 + TypeScript 项目
首先为了使用Vue需要下载node.js。

在VScode中，ctrl+~快捷键打开命令行，输入
 npm create vite@latest approvalKit --template vue-ts
 （代表使用 Vue3 + TypeScript 模板）

选择
√ Package name: ... approvalKit
√ Select a framework: » Vue
√ Select a variant: » TypeScript

然后
进入项目目录：
cd approvalKit
安装依赖：
npm install
运行项目，确认一切正常：
npm run dev


## 2. 配置 ESLint + Prettier 代码风格
### 安装ESLint
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue

初始化ESLint
npx eslint --init

选择
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · typescript
√ Where does your code run? · browser         
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm

### 安装Prettier
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

下一步是修改 `eslintrc.json`（ ESLint v9之前的版本）或`eslint.config.js`（ESLint v9之后的版本） 让 ESLint 和 Prettier 兼容（请见文件`eslint.config.js`）。如果你的是`eslintrc.json`，那么语法是不同的，配置方法和我不一样。

测试ESLint是否正常
运行npm run lint
如果没有错误或只是警告，说明 ESLint 配置成功。

**确保 VSCode 使用 ESLint 和 Prettier**
1. **安装 Prettier 扩展**。
2. **安装 ESLint 扩展**。
3. **配置 VSCode 默认格式化工具**：
    - 打开 VSCode 设置（`Ctrl + ,`）
    - 搜索 `default formatter`
    - 选择 `Prettier - Code formatter`
4. **启用 ESLint 自动修复**：
    - 在 VSCode 设置中搜索 `format on save`
    - 勾选 `Editor: Format On Save`
    - 搜索 `eslint format on save`
    - 如果有 `ESLint: Format On Save`，勾选就完成了。
    - 如果没有这一项，需要在Settings.json里手动添加：
```
让VSCode 在保存代码时自动修复 ESLint 规则
"editor.codeActionsOnSave": { "source.fixAll.eslint": true }, 
告诉VSCode哪些文件类型应该由 ESLint 进行检查
"eslint.validate": ["javascript", "typescript", "vue"]
```

创建**Prettier** 的配置文件`.prettierrc` 文件，它用于定义代码格式化规则，确保代码风格统一。

## 3. 配置Vitest

安装
npm install -D vitest @vue/test-utils jsdom

修改 `package.json`，添加测试脚本：
```
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch"
}
```

在根目录下创建vitest.config.ts文件。
```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
```

和src同级的地方，新建tests文件夹（如果已经有的话就不用了，反正我的没有）。
在tests文件夹里写一个以.test.ts结尾的文件，用来测试Vitest是否正常。

我这里暂时用的是一个example.test.ts
```
import { describe, it, expect } from 'vitest'

describe('Math test', () => {
  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2)
  })
})
```
意思是检测1+1是否等于2。

运行测试，确认 Vitest 是否正常：
npm run test

如果显示正常，可以进入下一步了。

## 4. GitHub版本管理

初始化git仓库
git init

创建.gitignore
touch .gitignore

在.gitignore文件中添加
```
node_modules/
dist/
.vscode/
.idea/
.DS_Store
```
这是为了不上传node_modules。
node_modules包含所有npm依赖，上传它会让Git仓库变得臃肿。而package.js和package-lock.json已经记录你需要哪些依赖了。

接下来也是常规操作
```
git remote add origin https://github.com/你的用户名/vue-approval-components.git
git branch -M main
git push -u origin main
```

至此初始化完成。
