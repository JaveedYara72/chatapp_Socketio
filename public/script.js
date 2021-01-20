let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

$('#btnStart').click(()=>{
    socket.emit('login',{
        username : $('#inputUserName').val(),
        password : $('#inpPass').val(),
    })
})

socket.on('logged_in',()=>{
    $('#loginBox').hide()
    $('#chatBox').show()
})

socket.on('login_failed',()=>{
    window.alert('username or password is wrong')
})

$('#btnSendMsg').click(()=>{
    socket.emit('msg_send',{
        to: $("#inpToUser").val(),
        msg:$('#inpNewMsg').val()
    })
})

socket.on('msg_rcvd',(data)=>{
    $('#ulMsgs').append($('<li>').text(data.msg))
})





















// let btnSend = document.getElementById('btnSend')
// let inpMsg = document.getElementById('inpMsg')
// let ulMsgList = document.getElementById('ulMsgList')

// window.onload = function(){
//     btnSend.onclick = function(){
//         socket.emit('msg_send',{ //'msg_Send' is an event
//             msg: inpMsg.value
//         }) //This is an event.
//         inpMsg.value = ''
//     }
// }

// socket.on('msg_rcvd',(data)=>{
//     let liNewMsg = document.createElement('li');
//     liNewMsg.innerText = data.msg;
//     ulMsgList.appendChild(liNewMsg);
// })