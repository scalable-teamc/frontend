import io from "socket.io-client";

const socket = io.connect('/socket.io')
export {socket}