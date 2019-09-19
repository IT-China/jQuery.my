# jQuery 封装

## 方法列表

| jQuery 功能                | 进度   | 核心备注                        |
| -------------------------- | ------ | ------------------------------- |
| 选择器                     |        |                                 |
| `$('div')`                 | +      | `querySelectorAll()`            |
| `$(function(){  })`        | +      | `DOMContentLoaded`              |
| `$(DOM对象)`               | +      | `window`, `document` 也可以包装 |
| `$(DOM伪数组)`             | +      | `HTMLCollection`，`NodeList`    |
| 类名操作                   |        |                                 |
| `.addClass()`              | +      | `classList.add()`               |
| `.removeClass()`           | +      | `classList.remove()`            |
| `.toggleClass()`           | +      | `classList.toggle()`            |
| 遍历                       |        |                                 |
| `.each()`                  | +      | 难点，高阶函数                  |
| 显示隐藏切换               |        |                                 |
| `.show()`                  | +      |                                 |
| `.hide()`                  | +      |                                 |
| `.toggle()`                | +      | `getComputedStyle`              |
| 值的获取和设置             |        |                                 |
| `.val()`                   | +      | `value`                         |
| `.html()`                  | +      | `innerHTML`                     |
| `.text()`                  | +      | `innerText`                     |
| 关系查找                   |        |                                 |
| `.eq()`                    | +      | `index`                         |
| `.parent()`                | +      | `parentNode`                    |
| `.children()`              | +      | `children`                      |
| `.siblings()`              | +      | `parentNode.children`           |
| 事件绑定                   |        |                                 |
| `on('类型',函数)`          | 计划中 | 普通绑定                        |
| `on('类型','选择器',函数)` | 计划中 | 事件委派                        |
| `off('类型',函数)`         | 计划中 |                                 |
| 属性样式修改               |        |                                 |
| `.prop()`                  | 计划中 |                                 |
| `removeProp()`             |        |                                 |
| `.attr()`                  | 计划中 |                                 |
| `.removeAttr()`            |        |                                 |
| `.css()`                   | 计划中 | 难点                            |



