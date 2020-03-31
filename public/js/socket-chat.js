var socket = io();
var params=new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala'))
{
	window.location='index.html';
	throw new Error('el nombre es necesario');
}

var usuario={
	nombre:params.get('nombre'),
	sala:params.get('sala')
};	

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('signChat', usuario, function(resp){
    	console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('sendMessage', function(message) {
    console.log('Servidor:', message);
});

//conexion y desconexion de usuarios
socket.on('users_connected', function(users) {
    console.log(users);
});

//mensajes privados
socket.on('privateMessage', function(message){
	console.log('private message: ', message);
});
