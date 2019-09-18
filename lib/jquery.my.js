// 自调用函数作用：防止变量冲突，把所有 jQuery 封装时用到的变量都变成局部变量
(function () {
    // $ 其实就是一个函数
    var $ = function (selector) {
        // 调用 $() 的时候其实是返回一个新的 jQuery 对象
        return new Init(selector);
    }
    // 实例 jQuery 对象需要用到的核心构造函数，接收 selector 选择器作为参数
    function Init(selector) {

    }

    // Init 原型上添加方法，所以 jQuery 对象共享原型添加的方法
    Init.prototype.addClass = function () {

    }

    Init.prototype.removeClass = function () {

    }

    Init.prototype.toggleClass = function () {

    }

    // 把局部的 jQuery 变量挂载到 window 全局对象中，占用 $ 和 jQuery 两个全局名称
    window.jQuery = window.$ = $;
})();
