const WebSocket = require('ws');
var waitUntil = require('wait-until');
var ROSLIB = require('roslib')

var express = require('express');
var app = express();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";





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




// app.get('/getTopics', function (req, res) {
//   res.json({"aa":"12"});

//   var cmdVel = new ROSLIB.Topic({
//     ros : ros,
//     name : '/alexa_command',
//     messageType : 'std_msgs/String'
//   });
//   var command = new ROSLIB.Message({data: "haha"});
//    cmdVel.publish(command);

// })






app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);
    else  next();
});



app.get('/getVideos', function (req, res) {
 

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("media");

  // dbo.collection("video_info").find({},{ "video_id":1,"video_rtsp": 1 ,"video_name":1,"_id":0}, function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
   
  //   db.close();
  // });

   dbo.collection("video_info"). find({},{ "video_id":1,"video_rtsp": 1 ,"video_name":1,"_id":0}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
         res.json({"res":result});
        db.close();
    });



});

})



app.post('/playvideo/:music_type/:request_id', function (req, res) {

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/media_command',
    messageType : 'std_msgs/String'
  });

video_rtsp = "NONE"
var is_done = false
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("media");
  console.log("music_type:"+req.params.music_type)
  console.log("request_id:"+req.params.request_id)
  dbo.collection("video_info").findOne({"type_id":parseInt(req.params.music_type),"video_id":parseInt(req.params.request_id)},{ "video_id":1,"video_rtsp": 1 ,"video_name":1,"_id":0}, function(err, result) {
    if (err) throw err;
    console.log(result);
    video_rtsp = result.video_rtsp
    is_done = true
    db.close();
  });
});


waitUntil()
    .interval(500)
    .times(10)
    .condition(function() {
        return (is_done ? true : false);
    })
    .done(function(result) {
        console.log(video_rtsp)
          var command = new ROSLIB.Message({data: video_rtsp});
          cmdVel.publish(command);

    });
 







  res.json({"status":"DONE"});
  // res.json({"music_type":req.params.music_type,"request_id":req.params.request_id});


})

app.post('/stop', function (req, res) {
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/media_command',
    messageType : 'std_msgs/String'
  });
    var command = new ROSLIB.Message({data: "stop"});
   cmdVel.publish(command);

  res.json({"status":"STOP DONE"});
})


app.post('/pause', function (req, res) {
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/media_command',
    messageType : 'std_msgs/String'
  });
    var command = new ROSLIB.Message({data: "pause"});
   cmdVel.publish(command);

  res.json({"status":"PAUSE DONE"});
})




app.post('/volumup', function (req, res) {
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/media_command',
    messageType : 'std_msgs/String'
  });
    var command = new ROSLIB.Message({data: "volumup"});
   cmdVel.publish(command);

  res.json({"status":"volumup DONE"});
})



app.post('/volumdown', function (req, res) {
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/media_command',
    messageType : 'std_msgs/String'
  });
    var command = new ROSLIB.Message({data: "volumdown"});
   cmdVel.publish(command);

  res.json({"status":"volumdown DONE"});
})













var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("------------------http://%s:%s", host, port)

})


