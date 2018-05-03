import fastClick from 'fastclick';

// 移动端300毫秒延迟
const fastclick = function () {
    fastClick.attach(document.body);
}

export {
    fastclick
}