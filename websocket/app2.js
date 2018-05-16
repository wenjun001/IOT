const http = require('http');
const WebSocket = require('ws');
const url = require('url');
var waitUntil = require('wait-until');
var returnFromClient =false;
var resFromClient = "";
const PORT = process.env.PORT || 5000

const wss1 = new WebSocket.Server({ noServer: true });

wss1.on('connection', function connection(ws) {
  console.log("connection");
  ws.on('message', function incoming(data) {
    console.log("message:"+data);

  if (data === '{"kind":"ping"}') { 
      console.log(data)
      ws.send('{"kind":"pong"}');
  }else{

      returnFromClient = true;
      resFromClient = data;
  }

});

});

const server = http.createServer(function(req, res) {

   var command ="";
   var isReady = false;
   if (req.method == 'POST') {


       console.log(wss1.clients.size)

      if(wss1.clients.size == 0){
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(buildRes("your home platfrom is not ready, please try again.")));
        return;

      }


        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {

            var reqJson = JSON.parse(jsonString); 
            console.log(reqJson)
            console.log(reqJson['request']['intent'])
            if(reqJson['request']['intent']!=null && reqJson['request']['intent']['name']!=null){
              command = reqJson['request']['intent']['name'];
            }
            
            if(reqJson['request']['intent']!=null && reqJson['request']['intent']['slots']!=null){
              var moreInfo = reqJson['request']['intent']['slots']['place']['value']
            if(moreInfo!=''){
              command = command+"|"+moreInfo;
            }

            }
           
            isReady = true;
        });
    }
        waitUntil()
        .interval(500)
        .times(10)
        .condition(function() {
            return (isReady ? true : false);
        })
      .done(function(result) {

          console.log("command :"+command);
          wss1.clients.forEach(function each(client) {

          if ( client.readyState === WebSocket.OPEN) {
            client.send(command);
            waitUntil()
            .interval(500)
            .times(10)
            .condition(function() {
                return (returnFromClient ? true : false);
            })
          .done(function(result) {
              console.log("get POST result")
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(buildRes(resFromClient)));
          });


          }
        });



      });   



   
  

}

);

function buildRes(text){

    var o = {};
  o["version"] = "1.0";
  var version = "version";
  o["shouldEndSession"] = "true";
  var speach={};
  speach["type"]="PlainText";
  speach["text"]=text;
  var response ={};
  response["outputSpeech"] = speach;
  o["response"]=response;
  return o;


}


server.on('upgrade', function upgrade(request, socket, head) {
  console.log(request.url)
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/iot') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);

    });
  }else {
    socket.destroy();
  }
});

server.listen(5050);