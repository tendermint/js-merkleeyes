var client = require("./index");
var net = require("net");

var conn = net.connect(46659, function() {
  var c = new client.Client(conn);

  c.get("foo", function(res) { console.log(res.toString("utf8")); });
  c.set("foo", "bar");
  c.get("foo", function(res) { console.log(res.toString("utf8")); });
  c.getHash(function(res) { console.log(res.toString("hex")); });
  c.rem("foo");
  c.get("foo", function(res) { console.log(res.toString("utf8")); });
  c.getHash(function(res) { console.log(res.toString("hex")); });

});

