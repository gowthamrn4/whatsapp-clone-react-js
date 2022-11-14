import io from "socket.io-client";
const url = "ws://localhost:8004/chat-service";

const socket = (opts) =>{
    io.connect(url, opts)
}
export default socket;









// let socket = io("http://localhost:5000",{ transports: ['websocket', 'polling', 'flashsocket'] , secure: true});
