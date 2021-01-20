const http = require('http')
const express = require('express')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

let users = {
    'arnav': 'agag123'
}

let socketMap = {}

io.on('connection',(socket)=>{
    console.log('Connected with socket id = ', socket.id)

    socket.on('login',(data)=>{
        if(users[data.username]){
            if(users[data.username] === data.password){
                socket.join(data.username) // Joining the Socket using the username
                socket.emit('logged_in')
            }else{
                socket.emit("login_failed")
            }
        }else{ // If He doesn't exist, then simply sign him up. also adding the users and the passwords to their object data type in js
            users[data.username] = data.password //Simple Sign Up
            socket.join(data.username) // Joining the Socket using the username
            socket.emit('logged_in')
        }
        console.log(users)
    })


    socket.on('msg_send',(data)=>{
        if(data.to){
            io.to(data.to).emit('msg_rcvd',data)
        }else{
            socket.broadcast.emit('msg_rcvd',data) //Send the Data back and broadcast it
        }
    })



    // socket.on('msg_send',(data)=>{ //This socket.on is coming from the emission of script.js which is emitting
    //     io.emit('msg_rcvd',data)
    //     // Socket.broadcast.emit sends the message to every other socket except the one sending it
    //     // socket.emit would send the message back to the same socket
    //     // console.log('received',data.msg) //This data.msg is the value of the input value, and the object that we are emitting out of the script.js
    // })
})

app.use('/',express.static(__dirname + '/public'))

server.listen(3000,()=>{
    console.log("Server is running");
})