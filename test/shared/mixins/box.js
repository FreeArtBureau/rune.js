describe("Box", function() {

  var m;

  beforeEach(function() {
    m = newMixin(Rune.Box);
    m.box();
  });

  describe("shape()", function() {

    it("assigns default variables", function() {
      expect(typeof m.box).toEqual("function");
      expect(m.vars.width).toEqual(0);
      expect(m.vars.height).toEqual(0);
    });

    it("copies variables from object", function() {
      setBoxVars(m);
      var m2 = newMixin(Rune.Box);
      m2.box(m);
      expect(m2.vars.width).toEqual(300);
      expect(m2.vars.height).toEqual(305);
    });

  });

  describe("scaleBox()", function() {

    it("scales width and height", function() {
      m.vars.width = 200;
      m.vars.height = 300;
      m.scaleBox(3);
      expect(m.vars.width).toEqual(600);
      expect(m.vars.height).toEqual(900);
    });

  });

});