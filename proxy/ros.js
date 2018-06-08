const WebSocket = require('ws');
var waitUntil = require('wait-until');
var ROSLIB = require('roslib')

var express = require('express');
var app = express();


console.log('start once again');



var ros = new ROSLIB.Ros({
    url : 'ws://192.168.1.100:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });


  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });




app.get('/getTopics', function (req, res) {
  res.json({"aa":"12"});

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/alexa_command',
    messageType : 'std_msgs/String'
  });
  var command = new ROSLIB.Message({data: "haha"});
   cmdVel.publish(command);

})


app.post('/playvideo/:music_type/:request_id', function (req, res) {

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/command',
    messageType : 'std_msgs/String'
  });
  var command = new ROSLIB.Message({data: req.params.music_type+" "+req.params.request_id});
   cmdVel.publish(command);

  res.json({"status":"DONE"});
  // res.json({"music_type":req.params.music_type,"request_id":req.params.request_id});


})

app.post('/stop', function (req, res) {
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/command',
    messageType : 'std_msgs/String'
  });
    var command = new ROSLIB.Message({data: "stop"});
   cmdVel.publish(command);

  res.json({"status":"STOP DONE"});
})







var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("------------------http://%s:%s", host, port)

})


