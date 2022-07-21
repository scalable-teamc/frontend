import io from "socket.io-client";

const socket = io.connect('http://localhost/')
export {socket}