var without = require("lodash/array/without");
var flatten = require("lodash/array/flatten");

var Parent = {

  setupParent: function() {
    this.children = [];
    this.changedChildren = [];
    this.renderedChildren = [];
  },

  addChild: function(child) {
    if(child.parent) child.parent.remove(child);
    this.children.push(child);
    child.parent = this;
    child.childId = this.children.length-1;
    child.changed();
  },

  removeChild: function(child) {
    this.children = without(this.children, child);
    this.changedChildren = without(this.changedChildren, child.childId);

    // Lower id's of all children above by one
    for(var i = child.childId; i < this.children.length; i++) {
      this.children[i].childId--;
    }

    // lower id's of all changedChildren by one
    for(var i = 0; i < this.changedChildren.length; i++) {
      if(this.changedChildren[i] > child.childId) this.changedChildren[i]--;
    }

    child.childId = null;
    child.parentNotified = false;
    child.parent = false;
    this.changed();
  },

  renderChildren: function(opts) {

    // loop through the changed children
    while(this.changedChildren.length > 0) {
      var childId = this.changedChildren.shift();
      this.renderedChildren[childId] = this.children[childId].render(opts);
      this.children[childId].parentNotified = false;
    }

    // FIGURE OUT HOW NOT TO FLATTEN EVERY TIME!
    return flatten(this.renderedChildren, true);
  }


};

module.exports = Parent;