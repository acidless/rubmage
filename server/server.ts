import app from './app';
import mongoose from 'mongoose';
import config from './config/config.json';
import socketio, { Socket } from 'socket.io';
import http from 'http';

/*====================*/

mongoose.connect(
  `mongodb+srv://rubtid:${config.database.password}@cluster0.7zktq.mongodb.net/${config.database.name}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log('DB connected!');
  }
);

/*====================*/

const server = http.createServer(app);
// @ts-ignore
const io = socketio(server);
io.on('connection', (socket: Socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

server.listen(1488, () => {
  console.log('Server is started');
});
