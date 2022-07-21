import io from "socket.io-client";

const socket = io.connect('/socket.io', {'timeout': 50000, 'connect_timeout': 50000})

export {socket}