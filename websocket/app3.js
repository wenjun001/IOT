const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:8090/', {
  origin: 'https://websocket.org'
});

ws.on('open', function open() {
  console.log('connected');
  ws.send(Date.now());
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function incoming(data) {
  console.log(`Roundtrip time:  ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
});