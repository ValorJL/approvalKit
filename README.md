# 目前进度
项目初始化（Vue3+Vite+ESLint+Prettier+Vitest）√

组件1：审批按钮（Approve、Reject、Pending）√

组件2：审批进度条（ApprovalSteps）【在这一步】

组件3：审批反馈框（FeedbackBox）

组件4：审批状态标签（StatusTag）

组件5：按钮组（ButtonGroup）

组件6：审批操作组合（ApprovalActions）


# 开发工具与依赖版本
开发工具：
Visual studio Code，
Window系统，
PowerShell

重要依赖：
vue: 3.5.13，
eslint: 9.20.1，
prettier: ^3.5.0，
typescript: ~5.7.2，
vite: ^6.1.0，
vitest: ^3.0.5

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

**Window系统很容易遇到一个问题:警告：LF will be replaced by CRLF Window**
 `LF`是Unix / Linux / macOS 的换行符，而Window系统默认回车使用 CRLF(`\r\n`) 而不是LF(`\n`)，但是Prettier想要会把CRLF认成错误。

我选择的解决方案是强制使用lf。
在.prettierrc文件添加"endOfLine": "lf"，
然后格式化所有文件：
```
npx prettier --write .
```
这样就修好了。

修好后部署到git仓库又会重新遇到一次。因为 Git 发现你的项目文件使用的是 `LF`，而你的 Windows 系统默认使用 `CRLF`。
你可以运行以下命令，让 Git 保持 `LF`，避免自动转换：git config --global core.autocrlf false

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

# 开发组件
## 审批按钮
### 开发ApproveButton.vue

颜色参考Ant Design的设计规范，并都遵循悬停时按钮颜色变深等常见规范。通过按钮是绿色，拒绝按钮是红色，待定按钮是灰色。由于个人偏好，整体颜色选择比常见UI选择更浅。
（如果后期还有时间，考虑针对色弱多做几套配色方案。）

通过按钮

主色：green-4 95de64

悬停：green-5 73d13d

点击：green-6 52c41a

边框：green-7 389e0d

文字：green-9 135200

拒绝按钮

主色：red-4 ffa39e

悬停：red-5 ff7875

点击：red-6 ff4d4f

边框：red-7 cf1322

文字：red-9 820014

待定按钮

主色：gray-4 f0f0f0

悬停：gray-5 d9d9d9

点击：gray-6 bfbfbf

边框：gray-7 8c8c8c

文字：gray-10 262626

### 添加到App.vue看看效果

遇到错误：Could not find a declaration file for module './components/ApprovalButton.vue'. 'c:/approval-kit/approvalKit/src/components/ApprovalButton.vue' implicitly has an 'any' type.ts-plugin(7016)
这通常是由于 TypeScript 需要额外的配置来正确解析 Vue 单文件组件。
解决方案：
在 `src` 目录下创建一个 `shims-vue.d.ts` 文件，并添加以下内容：
```
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
这个文件告诉 TypeScript 所有 `.vue` 文件都可以被正确解析为 Vue 组件。
然后快捷键ctrl+shift+P，输入reload Window快速重启VScode。问题就解决了。

### 编写 Vitest 单元测试

具体代码见tests/components/ApprovalButton.test.js

启动测试：
npm run test

这里遇到Error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files. 这是因为文件夹里有vitest.config.ts也有vite.config.ts。

如果同时存在vitest.config.ts和vite.config.ts，那么 Vitest只会读取vitest.config.ts，而Vite只会读取vite.config.ts。

如果 Vue 插件 (@vitejs/plugin-vue) 只在vite.config.ts里，但 vitest.config.ts里 没有，那么 Vitest运行测试时不会解析.vue组件，导致Failed to parse source for import analysis 错误。

解决方法：合并两个文件。直接在 vite.config.ts 里添加 Vitest 配置，然后删除 vitest.config.ts，只保留 vite.config.ts。


### 添加types.ts
在这一步时，觉得待处理用pending这个单词、审批结果为待定时用onhold这个单词更合适，所以把button里的pending button改名为onhold button了。

看了一些通用组件库的视频教程，决定先添加types.ts，它可以为开发者输入组件类型时提供编辑器的自动提示，以避免拼写错误和无效值。
```
export type ApprovalButtonType = 'approve' | 'reject' | 'onhold'

export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  type: ApprovalButtonType
  label?: string
  size?: ButtonSize
  disabled?: boolean

}
```

将types.ts引用到ApprovalButton.vue，并且动态绑定。
```
<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { ApprovalButtonType, ButtonSize } from '@/types'
  
const props = defineProps<{
  type?: ApprovalButtonType
  label?: string
  size?: ButtonSize

}>()
```

动态绑定1：通过 computed 计算 buttonClass，根据 type 生成不同的 CSS 类，动态改变按钮样式。
```
const buttonClass = computed(() => ({
  [`${props.type}-button`]: props.type,
  [`button-${props.size}`]: props.size,
}))
```

动态绑定2：可以通过 label 传入自定义文本，如果用户没有提供 label，就使用默认文本
```
const label = computed(() => props.label || defaultLabels[props.type || 'approve'])
</script>
```

ApprovalButton.test.js也相应更新了。


## 审批进度条
![1739917513167](https://github.com/user-attachments/assets/09a9d29f-d95e-4c8b-bfce-313a4da8d9d3)







