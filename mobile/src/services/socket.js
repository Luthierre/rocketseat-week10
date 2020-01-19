import socketio from 'socket.io-client';


const socket = socketio('http://192.168.1.108:3333', {
    autoConnect: true,
});

function connect(){
    socket.connect();
};

function disconnect(){
    if(socket.connected) {
        socket.disconnect();
    }
};
export {
    connect,
    disconnect,
};