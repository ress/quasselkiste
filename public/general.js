(function() {
  var socket = io.connect();
  socket.emit("set userid", get_user_id());

  socket.on("user count", function(user_count) {
    console.log("Connected users: " + user_count);
  });

  // Taken from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  function get_user_id() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
  }
})();