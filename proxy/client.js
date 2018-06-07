const WebSocket = require('ws');
var waitUntil = require('wait-until');
var ROSLIB = require('roslib')


console.log('start once again');



var ros = new ROSLIB.Ros({
    url : 'ws://192.168.1.10:9090'
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




var   ws = new WebSocket("ws://still-stream-35123.herokuapp.com/iot");
//var ws = new WebSocket("ws://127.0.0.1:5050/iot");

ws.onopen =  function (msg) {
    console.log('webSocket opened');
     ws.send('{"kind":"ping"}');  
    };

ws.onmessage = function (message) {
        console.log('receive message : ' + message.data);
          if (message.data === '{"kind":"pong"}') { 
        
            setTimeout(function timeout() {
                ws.send('{"kind":"ping"}'); 
                }, 30000);
            }else{
                // handle command from alexa
                //turnofflight
               //turnonlight
                //kidsmusic
                //opencamera|room 
                //closecamera|room

                var cmdVel = new ROSLIB.Topic({
                    ros : ros,
                    name : '/alexa_command',
                    messageType : 'std_msgs/String'
                  });
                  var command = new ROSLIB.Message({data: message.data});
                   cmdVel.publish(command);

                // transfer it let alexa to say it.
                if(message.data=='turnonlight'){
                    ws.send("Hi friend I have turn on light !");

                   return

                }


                if(message.data=='turnofflight'){
                    ws.send("Hi friend I have turn off light !");
                   return

                }

                if(message.data=='kidsmusic'){
                    ws.send("Hi friend I have asked to play kids music now !");
                   return

                }

                if(message.data=='stopkidsmusic'){
                    ws.send("Hi friend I have asked to stop kids music now !");
                   return

                }

                if(message.data=='opencamera|room'){
                    ws.send("Hi friend I have asked to open room camera!");
                   return

                }

                if(message.data=='closecamera|room'){
                    ws.send("Hi friend I have asked to close room camera!");
                   return

                }

                if(message.data=='playhappy'){
                    ws.send("Hi friend I have asked to play happy music");
                   return

                }

                if(message.data=='stophappy'){
                    ws.send("Hi friend I have asked to stop happy music");
                   return

                }


                if(message.data=='playsoftmusic'){
                    ws.send("Hi friend I have asked to play soft music");
                   return

                }


                if(message.data=='stopsoftmusic'){
                    ws.send("Hi friend I have asked to stop play soft music");
                   return

                }




                ws.send("I can't handle this command please contract my host");



            }



        
    };

ws.onerror = function (error) {
        console.log('error :' + error.name + error.number);
    };


ws.onclose =  function () {
        console.log('webSocket closed');
    };



