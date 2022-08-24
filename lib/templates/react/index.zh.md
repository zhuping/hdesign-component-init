# <%= componentNameUpper %> <%=componentCnName %>

## 示例

<code src="./demos/demo1.tsx"></code>

## <%=componentNameUpper %>

### 属性

| 属性        | 说明       | 类型         | 默认值      |
| ----------- | ----------| ----------- | ---------- |
| color       | 按钮的颜色  | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |

### CSS 变量

| 属性               | 说明     | 默认值                    | 全局变量                        |
| ------------------ | -------- | ------------------------- | ------------------------------- |
| --background-color | 背景颜色 | `var(--hdm-color-white)`  | `--hdm-button-background-color` |

### Ref

| 属性          | 说明             | 类型                          |
| ------------- | ---------------- | ----------------------------- |
| nativeElement | 原始 button 元素 | `HtmlButtonElement` \| `null` |