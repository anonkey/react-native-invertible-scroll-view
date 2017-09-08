(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.ScrollableMixin = mod.exports;
  }
})(this, function (module) {
  "use strict";

  var ScrollableMixin = {
    getInnerViewNode: function getInnerViewNode() {
      return this.getScrollResponder().getInnerViewNode();
    },
    scrollTo: function scrollTo(destY, destX) {
      this.getScrollResponder().scrollTo(destY, destX);
    },
    scrollWithoutAnimationTo: function scrollWithoutAnimationTo(destY, destX) {
      this.getScrollResponder().scrollWithoutAnimationTo(destY, destX);
    }
  };

  module.exports = ScrollableMixin;
});