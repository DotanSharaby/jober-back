const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const jobRoutes = require('./api/job/job.routes')
const connectSockets = require('./api/socket/socket.routes')

app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'KMD jober',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
        credentials: true
    };
    app.use(cors(corsOptions));
}
if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/job', jobRoutes)
connectSockets(io);

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});