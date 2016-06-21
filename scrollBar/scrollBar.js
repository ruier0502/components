
function scrollBar() {
    this.scrollContentEle = null;
    this.scrollBarEle = null;
    this.scrollBarSliderEle = null;
    this.scrollContainerEle = null;
    this.scrollY = 0;
    this.scrollPageY = 0;
}
scrollBar.prototype.init = function(initEle){
     // body...  
     var _this = this;
     _this.scrollContainerEle = initEle;
     _this.scrollContentEle = _this.findChild(initEle, 'scroll-content');
     _this.scrollBarEle = _this.findChild(initEle, 'scroll-bar');
     _this.scrollBarSliderEle = _this.findChild(_this.scrollBarEle, 'scroll-slider');
     _this.sliderHeight();
     _this.action();

};
scrollBar.prototype.sliderHeight = function(){
    // body...
    var _this = this;
    var scrollClientH = _this.scrollContentEle.clientHeight;
    var scrollHeight = _this.scrollContentEle.scrollHeight;
    _this.scrollBarSliderEle.style.height = scrollClientH/scrollHeight * scrollClientH + 'px';
};
scrollBar.prototype.action = function(argument){
     // body...
     var _this = this;
    if(_this.getBrowserVersion() == "firefox") {
        _this.scrollContentEle.addEventListener('DOMMouseScroll', mousewheel, false);
    }
    else {
        _this.scrollContentEle.onmousewheel = mousewheel;
    }
    if(document.addEventListener) {
        _this.scrollBarSliderEle.addEventListener('mousedown', mousedown);
    }
    else if(document.attachEvent) {
        _this.scrollBarSliderEle.attachEvent('mousedown', mousedown);
    }

    // 以下是动作函数
    function mousedown(event) {
        var evt = event||window.event;
        _this.scrollPageY = evt.clientY;
        _this.scrollY = _this.scrollContentEle.scrollTop;
        document.body.onselectstart = function() {
            return false;
            // 避免拖动时引起的文字被选中的现象
        }
        document.documentElement.onmousemove = mousemove;
        document.documentElement.onmouseup = mouseup;
    }
    function mouseup(event) {
        document.documentElement.onmousemove = null;
    }
    function mousemove(event) {
        var evt = event || window.event;
        var step = _this.scrollContentEle.scrollHeight/_this.scrollContentEle.clientHeight;
        _this.scrollContentEle.scrollTop =_this.scrollY + step*(evt.clientY - _this.scrollPageY);
        _this.setSliderPosition();
    }
    function mousewheel(event) {
        var per = 20;
        var event = event || window.event;
        var wheelDelta = event.wheelDelta? event.wheelDelta/120 : event.detail/3;
        if(_this.getBrowserVersion() == "firefox") {
            if(wheelDelta > 0)
                this.scrollTop += per;
            else
                this.scrollTop -= per;
        }
        else{
            if(wheelDelta < 0) {
                this.scrollTop += per;
            }
            else {
                this.scrollTop -= per;
            }
        }
        _this.setSliderPosition();
    }
    
};
scrollBar.prototype.setSliderPosition = function(){
     // body...
     var _this = this;
    if(_this.scrollBarSliderEle.style.top == undefined)
        _this.scrollBarSliderEle.style.top = _this.getStyle(_this.scrollBarSliderEle, 'top');
    _this.scrollBarSliderEle.style.top = _this.scrollContentEle.scrollTop/_this.scrollContentEle.scrollHeight*_this.scrollContentEle.clientHeight + 'px';
};
//浏览器版本
scrollBar.prototype.getBrowserVersion = function() {
    var browser = {};
    var userAgent = navigator.userAgent.toLowerCase();
    var s;
    var version;
    (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;

    if (browser.ie) {
        version = 'msie';
    } else if (browser.firefox) {
        version = 'firefox';
    } else if (browser.chrome) {
        version = 'chrome';
    } else if (browser.opera) {
        version = 'opera';
    } else if (browser.safari) {
        version = 'safari';
    } else {
        version = '未知的浏览器类型';
    }

    return version;
}
// 获取浏览器CSS属性值
scrollBar.prototype.getStyle = function(obj, prop){
     // body...
    if (obj.currentStyle) //IE
    {
        return obj.currentStyle[prop];
    }
    else if (window.getComputedStyle) //非IE
    {
        propprop = prop.replace (/([A-Z])/g, "-$1");
        propprop = prop.toLowerCase ();
        return document.defaultView.getComputedStyle(obj,null)[propprop];
    }
    return null;
};
// 定义动作
// 寻找指定className的孩子节点
scrollBar.prototype.findChild = function(parentEle, className) {
    for(var i=0;i<parentEle.childNodes.length;i++) {
        var childNode = parentEle.childNodes[i];
        if(childNode.className == className)
            return childNode;
    }
    return false;
}