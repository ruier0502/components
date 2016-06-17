
var scrollBar = function() {
    this.scrollContentEle = null;
    this.scrollBarEle = null;
    this.scrollSliderEle = null;
    this.scrollContainer = null;
}
scrollBar.prototype.init = function(initEle){
     // body...  
     var _this = this;
     _this.scrollContainerEle = initEle;
     _this.scrollContentEle = findChild(initEle, 'scroll-content');
     _this.scrollBarEle = findChild(initEle, 'scroll-bar');
     _this.srollBarSlider = findChild(_this.scrollBarEle, 'scroll-slider');
     _this.SliderHeight();

};
scrollBar.prototype.SliderHeight = function(){
     // body... 
     var _this = this;
     var scrollContentH = _this.scrollContentEle.clientHeight;
     var scrollContainerH = _this.scrollContainerEle.clientHeight;
     _this.srollBarSlider.style.height = scrollContentH/scrollContainerH +'px';
};
scrollBar.prototype.action = function(argument){
     // body...  
};
// 寻找指定className的孩子节点
var findChild = function(parentEle, className) {
    for(var i=0;i<parentEle.childNodes.length;i++) {
        var childNode = parentEle.childNodes[i];
        if(childNode.className == className)
            return childNode;
    }
    return false;
}