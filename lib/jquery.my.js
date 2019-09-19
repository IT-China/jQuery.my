// 自调用函数作用：防止变量冲突，把所有 jQuery 封装时用到的变量都变成局部变量
(function () {
    // $ 其实就是一个函数
    var $ = function (selector) {
        // 调用 $() 的时候其实是返回一个新的 jQuery 对象
        return new Init(selector);
    }

    // ============= 模块1：选择器 =============
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

    // ============= 模块2：类名操作 =============
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
        // 利用 each 化简代码，高阶函数：把函数作为参数传递，函数在 each 内部执行
        return this.each(function (index, item) {
            item.classList.remove(className);
        });
    }

    Init.prototype.toggleClass = function (className) {
        // 利用 each 化简代码，高阶函数：把函数作为参数传递，函数在 each 内部执行
        return this.each(function (index, item) {
            item.classList.toggle(className);
        });
    }

    // ============= 模块3：each 遍历 =============
    // 隐式迭代核心： each 方法，用于遍历 jQuery 对象 !!!
    Init.prototype.each = function (fn) {
        // 遍历 jQuery 对象
        for (var i = 0; i < this.length; i++) {
            // 调用高阶回调函数，把实参 i 和 this[i] 传递过去
            fn(i, this[i]);
        }
        // 链式编程：方法内部返回调用该方法的那个对象
        return this;
    }

    // ============= 模块4：显示隐藏切换 =============
    Init.prototype.show = function () {
        return this.each(function (index, item) {
            item.style.display = 'block';
        });
    }

    Init.prototype.hide = function () {
        return this.each(function (index, item) {
            item.style.display = 'none';
        });
    }

    Init.prototype.toggle = function () {
        return this.each(function (index, item) {
            if (getComputedStyle(item).display === 'none') {
                item.style.display = 'block'
            } else {
                item.style.display = 'none';
            }
        });
    }

    // ============= 模块5：获取和设置内容和表单值 =============
    Init.prototype.val = function (value) {
        // 1. 没传参获取的情况 - 不化简
        if (value === undefined) {
            var dom = this[0];
            return dom.value;
        }
        // 2. 传参数设置的情况 - 不化简
        return this.each(function (index, item) {
            item.value = value;
        });
    }

    Init.prototype.html = function (str) {
        // 1. 没传参获取的情况 - if 化简了成为一行代码
        if (str === undefined) return this[0].innerHTML;
        // 2. 传参数设置的情况
        return this.each(function (index, item) {
            item.innerHTML = str;
        });
    }

    Init.prototype.text = function (str) {
        // 1. 没传参获取的情况 - if 化简了成为一行代码
        if (str === undefined) return this[0].innerText;
        // 2. 传参数设置的情况 - ES6 箭头函数化简成了一行代码
        return this.each((index, item) => item.innerText = str);
    }


    // ============= 模块6：筛选查找方法 =============
    // eq 其实就是利用了传入一个 DOM 元素，把 DOM 元素变成 JQ 对象，内部返回包装后的 JQ 对象
    Init.prototype.eq = function (index) {
        // this[index]  是一个 DOM 元素，把 DOM 对象传递过去包装成 JQ 对象
        var dom = this[index];
        // 把 DOM 元素通过 new Init() 包装成一个 JQ 对象，内部返回包装后的 JQ 对象
        return new Init(dom);
    }

    // parent 功能其实就是把 DOM 父节点转成 JQ 对象，内部返回包装后的 JQ 对象
    Init.prototype.parent = function () {
        // 查找到集合中的 DOM 元素
        var dom = this[0].parentNode;
        // 把 DOM 包装成新的 JQ 对象，内部返回包装后的 JQ 对象
        return new Init(dom);
    }

    // children 其实就是：当前元素的 所有孩子的集合
    Init.prototype.children = function () {
        // 查找到集合中的 DOM 元素
        var doms = this[0].children;
        // 把 DOM 包装成新的 JQ 对象，内部返回包装后的 JQ 对象
        return new Init(doms);
    }


    // 把局部的 jQuery 变量挂载到 window 全局对象中，占用 $ 和 jQuery 两个全局名称
    window.jQuery = window.$ = $;
})();
