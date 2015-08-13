var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/system.js', function(req, res){
  res.sendFile(__dirname + '/system.js');
});

app.get('/socket.js', function(req, res){
  res.sendFile(__dirname + '/socket.js');
});

app.get('/jquery.js', function(req, res){
  res.sendFile(__dirname + '/jquery.js');
});

app.get('/student', function(req, res){
  res.sendFile(__dirname + '/student.html');
});

app.get('/teacher', function(req, res){
  res.sendFile(__dirname + '/teacher.html');
});

app.get('/projection', function(req, res){
  res.sendFile(__dirname + '/projection.html');
});

app.get('/pentest', function(req, res){
  res.sendFile(__dirname + '/pentest.html');
});

app.get('/system.js', function(req, res){
  res.sendFile(__dirname + '/system.js');
});

app.get('/teacher.js', function(req, res){
  res.sendFile(__dirname + '/teacher.js');
});

app.get('/student.js', function(req, res){
  res.sendFile(__dirname + '/student.js');
});

app.get('/projection.js', function(req, res){
  res.sendFile(__dirname + '/projection.js');
});

app.get('/pentest.js', function(req, res){
  res.sendFile(__dirname + '/pentest.js');
});

app.get('/bootstrap.css', function(req, res){
  res.sendFile(__dirname + '/bootstrap.css');
});

app.get('/bootstrap.js', function(req, res){
  res.sendFile(__dirname + '/bootstrap.js');
});

io.on('connection', function(socket){
  socket.on('teacherX', function(value){
    console.log("teacherX: " + value);
    io.emit('teacherX', value);
  });
});

io.on('connection', function(socket){
  socket.on('studentX', function(value){
    console.log("studentX: " + value);
    io.emit('studentX', value);
  });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
