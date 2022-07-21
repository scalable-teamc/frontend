import io from "socket.io-client";

const socket = io.connect('/socket.io', {'timeout': 50000, 'connect_timeout': 50000})
await new Promise(r => setTimeout(r, 20000));
export {socket}