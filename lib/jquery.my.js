// 自调用函数作用：防止变量冲突，把所有 jQuery 封装时用到的变量都变成局部变量
(function () {
    // $ 其实就是一个函数
    var $ = function (selector) {
        // 调用 $() 的时候其实是返回一个新的 jQuery 对象
        return new Init(selector);
    }
    // 实例 jQuery 对象需要用到的核心构造函数，接收 selector 选择器作为参数
    function Init(selector) {
        // 初始化一个数组，用于存放查找到的 DOM 节点
        var doms = [];
        // 功能1：如果传入的是<字符串>，就查找元素
        if (typeof selector === 'string') {
            // 先查找到 DOM 集合
            doms = document.querySelectorAll(selector);
        }
        // 功能2：如果传入的是一个<函数>，就实现入口函数功能
        else if (typeof selector === 'function') {
            // JQ 入口函数
            document.addEventListener('DOMContentLoaded', selector);
        }
        // 功能3：如果是<window>或<节点> ，把它包装变成 JQ 对象，就能调用 jQuery 方法，注：document 对象也是节点
        else if (selector === window || selector instanceof Node) {
            doms.push(selector);
        }
        // 功能4：如果是<DOM伪数组集合>，直接赋值到 doms 中
        else if (selector instanceof HTMLCollection || selector instanceof NodeList) {
            doms = selector;
        }
        // 每次 new Init 创建 jQuery 对象，都把 doms 集合中的每个元素添加到新创建的 jQuery 对象中
        for (var i = 0; i < doms.length; i++) {
            // 遍历 DOM 对象添加到新对象中
            this[i] = doms[i];
        }
        // 给 jQuery 对象添加长度属性
        this.length = doms.length;
    }

    // Init 原型上添加方法，所以 jQuery 对象共享原型添加的方法
    Init.prototype.addClass = function (className) {
        // jQuery隐式迭代核心：遍历给集合中每个元素执行同样操作
        for (var i = 0; i < this.length; i++) {
            this[i].classList.add(className);
        }
        // jQuery链式编程核心：方法内部返回调用该方法的那个对象
        return this;
    }

    Init.prototype.removeClass = function (className) {
        // jQuery隐式迭代核心：遍历给集合中每个元素执行同样操作
        for (var i = 0; i < this.length; i++) {
            this[i].classList.remove(className);
        }
        // jQuery链式编程核心：方法内部返回调用该方法的那个对象
        return this;
    }

    Init.prototype.toggleClass = function (className) {
        // jQuery隐式迭代核心：遍历给集合中每个元素执行同样操作
        for (var i = 0; i < this.length; i++) {
            this[i].classList.toggle(className);
        }
        // jQuery链式编程核心：方法内部返回调用该方法的那个对象
        return this;
    }

    // 把局部的 jQuery 变量挂载到 window 全局对象中，占用 $ 和 jQuery 两个全局名称
    window.jQuery = window.$ = $;
})();
