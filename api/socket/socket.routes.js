
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('room', (room) => {
            socket.join(room);
        });
        socket.on('newPost', ({ post, id }) => {
            socket.broadcast.to(id).emit('newPost', post);
        })
        socket.on('updatePost', post => {
            socket.broadcast.to(post.id).emit('updatePost', post);
        })
        socket.on('jobApplied', app => {
            console.log('user applied', app)
            socket.broadcast.to(app.job.owner._id).emit('notify', app)
        })
    })
}