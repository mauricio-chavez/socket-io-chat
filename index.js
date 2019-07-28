const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const codex = require("emoji-codex"); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    try {
      let finalMessage = codex.translate(msg);
      io.emit('chat message', finalMessage);
    } catch (e) {
      if (e instanceof TypeError) {
        io.emit('chat message', msg);
      } else {
        console.log(e);
      }
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});