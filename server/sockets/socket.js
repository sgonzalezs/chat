const { io } = require('../server');
const { Users }=require('../classes/users');
const { createMessage } = require('../utilities/utilities');

const users=new Users();

io.on('connection', (client) => {

    //Ingreso al chat
    client.on('signChat', (user, callback)=>{

        if(!user.nombre){
            return callback({
                error:true,
                message:'El nombre es necesario'
            })
        }
        //Creamos, listamos y emitimos los usuarios conectados
        users.addUser(client.id, user.nombre, user.sala);
        client.broadcast.to(user.sala).emit('users_connected', users.getUserfromSala(user.sala));

        //Ingreso a saas de chat
        client.join(user.sala);

        callback(users.getUserfromSala(user.sala));
    });

    client.on('sendMessage', (data)=>{
        //Listamos el usuario
        let user=users.getUser(client.id);
        let message=createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit('sendMessage', message);
    });

    client.on('disconnect', ()=>{
        let user_deleted=users.deleteUser(client.id);

        client.broadcast.to(user_deleted.room).emit('createMessage', createMessage('Administrador', `${user_deleted.name} abandonó el chat`));
        client.broadcast.to(user_deleted.room).emit('users_connected', users.getUserfromSala(user_deleted.room));
    });

    //mensajes privados
    client.on('privateMessage', (data)=>{
        let user=users.getUser(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
    });

});

