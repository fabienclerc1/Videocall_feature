const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: 9000, path: '/peer' });

const userList = [];

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/io', (req, res) => {
	res.send('Server running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("callUser", ({ userToCall, from, name, roomId }) => {
        console.log(`calling user ${userToCall} with room Id ${roomId}`);
        io.to(userToCall).emit("callUser", { from, name, roomId });
	});

	socket.on('join-room', ({roomId, userId, peerId}) => {
        socket.join(roomId);
		console.log(`user ${userId} joined room ${roomId}`);
        socket.to(roomId).emit('user-connected', {peerId, socketId: userId});
    });

    socket.on('leave-room', ({roomId, userId}) => {
        socket.leave(roomId);
        console.log(`user ${userId} left room ${roomId}`);
    });

    socket.on('user-disconnected', ({roomId}) => {
        console.log('user left the call', roomId);
        socket.to(roomId).emit('user-disconnected');
    });

	socket.on('disconnect', clientId => {
        const index = userList.indexOf(socket.id);
        if (index !== -1) {userList.splice(index, 1);}
    });

    socket.on('cancel-call', ({userToCall}) => {
        console.log('cancelling call for user: ', userToCall);
        io.to(userToCall).emit("cancel-call");
    });

    socket.on('connect-server', () => {
        userList.push(socket.id);
		socket.emit('updated-list', userList);
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));