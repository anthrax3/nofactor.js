var nofactor = require("../"),
expect = require("expect.js");

describe("string dom", function() {
  sd = nofactor.string;

  it("can create a text node", function() {
    expect(sd.createTextNode("hello").toString()).to.be("hello");
  });

  it("properly encodes a text node", function() {
    expect(sd.createTextNode("hello <world").toString()).to.be("hello &lt;world");
  });

  it("can create an element", function() {
    expect(sd.createElement("div").toString()).to.be("<div></div>");
  });


  it("can add a comment node", function() {
    var comment = sd.createComment("hello");
    expect(comment.toString()).to.be("<!--hello-->");
  });

  it("can create an element with attributes", function() {
    var element = sd.createElement("div");
    element.setAttribute("hello", "world");
    element.setAttribute("nada");
    expect(element.toString()).to.be("<div hello=\"world\" nada></div>");
  });

  it("can properly encode attribute values", function() {
    var element = sd.createElement("div");
    element.setAttribute("href", "http://");
    element.setAttribute("abc", "<;");
    expect(element.toString()).to.be("<div href=\"http://\" abc=\"&lt;;\"></div>");
  });

  it("can create a fragment", function() {
    var frag = sd.createFragment();
    frag.appendChild(sd.createElement("div"));
    frag.appendChild(sd.createTextNode("abc"));
    expect(frag.toString()).to.be("<div></div>abc");
  });

  it("can add children to an element", function() {
    var element = sd.createElement("div");
    var text = sd.createTextNode("hello");
    element.appendChild(text);
    expect(element.toString()).to.be("<div>hello</div>");
  });

  it("can properly add a document fragment to an element", function() {
    var element = sd.createElement("div"),
    tn, tn2;
    var frag = sd.createFragment(tn = sd.createTextNode("hello"), tn2 = sd.createTextNode("world"));
    element.appendChild(frag);
    expect(element.toString()).to.be("<div>helloworld</div>");
    expect(tn.parentNode).to.be(element);
    expect(tn.nextSibling).to.be(tn2);
  });

  it("can properly prepend a fragment", function() {
    var element = sd.createElement("div"),
    tn, tn2, tn3;


    element.appendChild(tn3 = sd.createTextNode("!!!"));

    var frag = sd.createFragment(tn = sd.createTextNode("hello"), tn2 = sd.createTextNode("world"));
    element.insertBefore(frag, tn3);
    expect(element.toString()).to.be("<div>helloworld!!!</div>");
    expect(tn.parentNode).to.be(element);
    expect(tn.nextSibling).to.be(tn2);
  })



  it("has the proper siblings", function() {

    var element = sd.createElement("div"),
    tn = sd.createTextNode("hello"),
    tn2 = sd.createTextNode("hello2"),
    tn3 = sd.createTextNode("hello3");

    element.appendChild(tn);
    element.appendChild(tn2);
    element.appendChild(tn3);

    function testThree() {
      expect(tn.nextSibling).to.be(tn2);
      expect(tn2.nextSibling).to.be(tn3);
      expect(tn3.nextSibling).to.be(undefined);
      expect(tn3.previousSibling).to.be(tn2);
      expect(tn2.previousSibling).to.be(tn);
      expect(tn.previousSibling).to.be(undefined);
    }

    testThree();

    element.removeChild(tn2);
    expect(element.toString()).to.be("<div>hellohello3</div>")

    expect(tn.nextSibling).to.be(tn3);
    expect(tn3.nextSibling).to.be(undefined);
    expect(tn3.previousSibling).to.be(tn);
    expect(tn.previousSibling).to.be(undefined);

    element.insertBefore(tn2, tn3);

    testThree();
    expect(element.toString()).to.be("<div>hellohello2hello3</div>")


    element.removeChild(tn);
    expect(tn2.previousSibling).to.be(undefined);

    element.insertBefore(tn3, tn2);
    expect(tn2.previousSibling).to.be(tn3);

  });




});