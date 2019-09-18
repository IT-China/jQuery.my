// 自调用函数作用：防止变量冲突，把所有 jQuery 封装时用到的变量都变成局部变量
(function() {
    // $ 其实就是一个函数
    var $ = function() {
        
    };

    // 把局部的 jQuery 变量挂载到 window 全局对象中，占用 $ 和 jQuery 两个全局名称
    window.jQuery = window.$ = $;
})();
