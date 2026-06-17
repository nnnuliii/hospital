(function() {
    function init() {
        var topNav = document.querySelector('.top-nav');
        if (!topNav) {
            console.error('未找到 .top-nav 元素');
            return;
        }

        var SCROLL_THRESHOLD = 800; // 滚动超过800px显示

        function checkScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > SCROLL_THRESHOLD) {
                topNav.classList.add('show');
            } else {
                topNav.classList.remove('show');
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init(); // DOM已经就绪
    }
})();