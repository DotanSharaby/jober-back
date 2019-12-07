
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newPost', post => {
            console.log('got new post about to send it back', post);
            socket.broadcast.emit('newPost', post)
        })
        socket.on('updatePost', post => {
            console.log('got updated post', post);
            socket.broadcast.emit('updatePost', post)
        })
    })
}

