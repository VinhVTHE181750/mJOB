// import {useEffect, useRef, useState} from 'react';
// import io from 'socket.io-client';
// import { SOCKET_URL } from '../../App';

// const useWebSocket = (user) => {
//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     if (!user) {
//       console.error("User is undefined. Cannot establish socket connection.");
//       return;
//     }

//     // Initialize the socket connection
//     socketRef.current = io(SOCKET_URL, {
//       query: { user }
//     });

//     const socket = socketRef.current;

//     socket.on('connect', () => {
//       // console.log('Connected to the server');
//     });

//     socket.on('forumChat', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     socket.on('onlineUsers', (users) => {
//       setOnlineUsers(users);
//     });

//     socket.on('disconnect', () => {
//       // console.log('Disconnected from the server');
//     });

//     // Cleanup function
//     return () => {
//       if (socket && socket.readyState === 1) {
//         socket.close();
//       }
//     };
//   }, [user]);

//   const sendMessage = (message) => {
//     if (socketRef.current && socketRef.current.connected) {
//       socketRef.current.emit('forumChat', message);
//     }
//   };

//   return { messages, onlineUsers, sendMessage };
// };

// export default useWebSocket;
