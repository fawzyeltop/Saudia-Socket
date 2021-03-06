/*@ here we include express-framework @*/
const express = require('express');
const app = express();
/*@ here we include express-framework @*/

/*@ here we include express-framework @*/
const cors = require('cors');
app.use(cors());
/*@ here we include express-framework @*/

/*@ here we include Socket.io @*/
const http = require("http").Server(app);
const io = require('socket.io')(http);
/*@ here we include Socket.io @*/


/*@ Socket.io Connection @*/
io.on('connection', (socket) => {
    socket.on('cashierJoin', (data) => {
       try {
        console.log('Cashier has connected to Socket.io Real Time');
        socket.join(data.roomID);
        socket.emit('test', { roomID: data.roomID, name: 'Abdulrahman Fawzy' });
       } catch(err) {
        console.log(err.message);
        socket.emit('error', { errMessage: err.message })
       }
    }); 

    socket.on('tableOnline', (data) => {
        console.log('data');
        io.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('tableOnline', data);
    })
    socket.on("goOnline", data => {
        io.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('goOnline', data);
      });
    
      socket.on("goOffline", data => {
        io.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('goOffline', data);
      });
    
      socket.on("check", data => {
        console.log(data);
        io.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('check', data);
      });
    
      socket.on("waiter", data => {
        io.to('1fe35579-5ce7-46ec-89e0-7e7236700297').emit('waiter', data);
      })
   
});
/*@ Socket.io Connection @*/

/*@ NodeJS App is listening to Port-3000 @*/
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Running on Port: ${ port }`);
});
/*@ NodeJS App is listening to Port-3000 @*/
