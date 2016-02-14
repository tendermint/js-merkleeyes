var client = require("./index");
var net = require("net");

var c = new client.Client("tcp://127.0.0.1:46659");

c.get("foo",        (res) => { console.log("foo:", res.toString("utf8")); });
c.commit(           (res) => { console.log("hash: ", res.toString("hex")); });

c.set("foo", "bar", (   ) => { console.log("foo = bar"); });
c.get("foo",        (res) => { console.log("foo: ", res.toString("utf8")); });
c.commit(           (res) => { console.log("hash: ", res.toString("hex")); });

c.rem("foo",        (   ) => { console.log("delete(foo)"); });
c.get("foo",        (res) => { console.log("foo: ", res.toString("utf8")); });
c.commit(           (res) => { console.log("hash: ", res.toString("hex")); });

c.tmspCli.flush(() => { c.close(); });
