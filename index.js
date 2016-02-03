var tmsp = require("js-tmsp");
var wire = require("js-wire");

function Client(addr) {
  this.tmspCli = new tmsp.Client(addr);
}

Client.prototype.get = function(key, cb) {
  var w = new wire.Writer();
  w.writeByte(0x01); // "Get"
  w.writeByteArray(new Buffer(key));
  this.tmspCli.query(w.getBuffer(), function(res) {
    var r = new wire.Reader(res.data.toBuffer());
    var value = r.readByteArray();
    cb(value);
  });
  this.tmspCli.flush();
}

Client.prototype.set = function(key, value, cb) {
  var w = new wire.Writer();
  w.writeByte(0x01); // "Set"
  w.writeByteArray(new Buffer(key));
  w.writeByteArray(new Buffer(value));
  this.tmspCli.appendTx(w.getBuffer(), function(res) {
    cb();
  });
  this.tmspCli.flush();
}

Client.prototype.rem = function(key, cb) {
  var w = new wire.Writer();
  w.writeByte(0x02); // "Rem"
  w.writeByteArray(new Buffer(key));
  this.tmspCli.appendTx(w.getBuffer(), function(res) {
    cb();
  });
  this.tmspCli.flush();
}

Client.prototype.getHash = function(cb) {
  this.tmspCli.getHash(function(res) {
    cb(res.data.toBuffer());
  });
  this.tmspCli.flush();
}

module.exports = {
  Client: Client,
};

