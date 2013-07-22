// Generated by CoffeeScript 1.6.2
var DomFactory,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DomFactory = (function(_super) {
  __extends(DomFactory, _super);

  /*
  */


  function DomFactory() {}

  /*
  */


  DomFactory.prototype.createElement = function(name) {
    return document.createElement(name);
  };

  /*
  */


  DomFactory.prototype.createTextNode = function(text) {
    return document.createTextNode(text);
  };

  /*
  */


  DomFactory.prototype.createFragment = function() {
    var child, frag, _i, _len;

    frag = document.createDocumentFragment();
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      child = arguments[_i];
      frag.appendChild(child);
    }
    return frag;
  };

  /*
  */


  DomFactory.prototype.parseHtml = function(text) {
    var div;

    div = this.createElement("div");
    div.innerHTML = text;
    return this.createFragment.apply(this, div.childNodes);
  };

  return DomFactory;

})(require("./base"));

module.exports = new DomFactory();