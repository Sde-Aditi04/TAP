const io = require('socket.io-client');
const socketConfig = require('../config/socketConfig');

// Create a socket client and connect to the dashboard event
const socket = io('http://13.232.18.39/', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Origin': socketConfig.cors.origin,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': socketConfig.cors.origin,
        'Access-Control-Allow-Methods': socketConfig.cors.methods.join(', '),
        'Access-Control-Allow-Headers': socketConfig.cors.allowedHeaders.join(', '),
      }
    }
  }
});
socket.on('connect', () => {
  console.log('Connected to dashboard socket');
});
socket.on('disconnect', () => {
  console.log('Disconnected from dashboard socket');
});

// Forward data from the dashboard socket to the frontend client
function forwardDataToClient(client) {
  socket.on('dashboard', (data) => {
    client.emit('dashboard', data);
  });
}

module.exports = { forwardDataToClient };
