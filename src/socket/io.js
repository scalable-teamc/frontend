import io from "socket.io-client";

const socket = io.connect('/socket.io')
socket.on("disconnect", (reason) => {
    console.log(reason)
});
export {socket}