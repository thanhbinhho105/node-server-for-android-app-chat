var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

// app.get("/", function(req, res){
// 	res.sendFile(__dirname + "/index.html");	
// });
console.log("Server running");

var arrayUser = [];
var tontai = true;
io.sockets.on('connection', function (socket) {
	
  console.log("Co thiet bi vua ket noi");

  socket.on('client-register-user', function(data){

  		if (arrayUser.indexOf(data) == -1){
  			//khong ton tai user-> dc phep dk 
  			arrayUser.push(data);
  			tontai = false;
  			console.log("dang ki thanh cong:"  + data);
  			//gan ten user de goi
  			socket.un = data;
  			//gửi danh sách user về tất cả các máy 
  			io.sockets.emit('server-send-data',{ danhsach: arrayUser});
  		} else{
  			console.log("da ton tai user:" + data);
  			tontai = true;
  		}
  		//gui ket qua dk user->1 user
  		socket.emit('server-send-result',{ ketqua: tontai });

  		// console.log("Server nhan:" + data);
  		
  });

  socket.on('client-send-chat',function(noiDung){
  	console.log(socket.un + ":" + noiDung);
  	io.sockets.emit('server-send-chat', { chatConent : socket.un + ":" + noiDung });
  });

});