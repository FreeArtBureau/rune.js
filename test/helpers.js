function expectCopy(s) {

  // should copy shape
  setMixinVars(s);
  var copy = s.copy();
  expect(copy).not.toBe(s);
  expect(copy).toEqual(s);

  var g = new Rune.Group();
  g.add(s);

  // should not add to parent
  expect(g.children.length).toEqual(1);
  s.copy(false);
  expect(g.children.length).toEqual(1);

  // should add to parent
  s.copy();
  expect(g.children.length).toEqual(2);
}

function newMixin() {
  var Mixed = function() {};
  _.each(arguments, function(mixin) {
    _.extend(Mixed.prototype, mixin);
  });
  return new Mixed();
}

// Returns an object with variables that comes from
// all the mixins that the shape extends.
function getMixinVars(shape) {

  var keys = [];
  if(shape.shape) {
    keys = keys.concat(_.keys(getShapeVars()))
  }
  if(shape.box) {
    keys = keys.concat(_.keys(getBoxVars()))
  }
  if(shape.styles) {
    keys = keys.concat(_.keys(getStylesVars()))
  }

  var state = {};
  _.each(keys, function(key) {
    state[key] = shape.state[key];
  });
  return state;
}

// Sets variables in object that comes from
// all the mixins that the shape extends.
function setMixinVars(shape) {
  if(shape.shape) {
    setShapeVars(shape)
  }
  if(shape.box) {
    setBoxVars(shape)
  }
  if(shape.styles) {
    setStylesVars(shape)
  }
}

// Mixin getters
// -------------------------------------------

function getShapeVars(opts) {
  return _.defaults(opts || {}, {
    x:10,
    y:15,
    rotation: 45,
    rotationX: 100,
    rotationY: 105
  });
}

function getBoxVars(opts) {
  return _.defaults(opts || {}, {
    width:300,
    height:305
  });
}

function getStylesVars(opts) {
  return _.defaults(opts || {}, {
    fill: new Rune.Color(255, 0, 0),
    stroke: new Rune.Color(0, 255, 0),
    strokeWidth: 2,
    strokeCap: "square",
    strokeJoin: "bevel",
    strokeMiterlimit: 2,
    strokeDash: "0,1",
    strokeDashOffset: 4
  });
}

// Mixin setters
// -------------------------------------------

function setShapeVars(shape, opts) {
  var state = getShapeVars(opts)
  _.extend(shape.state, state);
}

function setBoxVars(shape, opts) {
  var state = getBoxVars(opts)
  _.extend(shape.state, state);
}

function setStylesVars(shape, opts) {
  var state = getStylesVars(opts)
  _.extend(shape.state, state);
}
