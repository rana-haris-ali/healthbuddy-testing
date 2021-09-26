const io = require('socket.io')(8900, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
	// when user connects
	socket.on('addUser', (userId) => {
		// add the connected user to users array
		addUser(userId, socket.id);

		// send the users array to connected clients
		io.emit('getUsers', users);
	});

	// send and get messages

	socket.on(
		'sendMessage',
		({ senderId, receiverId, conversationId, messageText }) => {
			// get user object from users array
			const user = getUser(receiverId);

			// if user exists, that means that user is online so
			// we will emit the event to them. If user does not exist,
			// that means he is offline so we dont have to worry about
			// instant chat and we can simply store message in DB
			if (user) {
				io.to(user.socketId).emit('getMessage', {
					senderId,
					conversationId,
					messageText,
				});
			}
		}
	);

	socket.on('createConversation', ({ receiverId }) => {
		// get user object from users array
		const user = getUser(receiverId);

		// if user exists, that means that user is online so
		// we will emit the event to them. If user does not exist,
		// that means he is offline so we dont have to worry about
		// instant chat and we can simply store message in DB
		if (user) {
			// swap receiverId with senderId and pass to the receiver. This is because if
			// object is passed without swap then the recipient will have his own id in receiver id

			io.to(user.socketId).emit('getConversation');
		}
	});

	// when user disconnects
	socket.on('disconnect', () => {
		removeUser(socket.id);
		io.emit('getUsers', users);
	});
});
