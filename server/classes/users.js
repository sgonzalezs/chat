class Users{

	constructor(){
		this.allusers=[];
	}

	//agregar usuarios
	addUser(id, name, room){
		let newUser={
			id,
			name,
			room
		};

		this.allusers.push(newUser);

		return this.allusers;
	}

	// Filtar un usuario
	getUser(id){
		//dentro de allusers busca user mientras el user.id sea igual al id que llega como parametro
		let user_filter = this.allusers.filter(user=>{
			return user.id===id
		})[0];

		return user_filter;
	}

	//Listar todos los usuarios
	getAllUsers(){
		return this.allusers;
	}

	//Listar usuarios por sala
	getUserfromSala(room){
		let usersRoom=this.allusers.filter(user=>{
			return user.room===room
		});

		return usersRoom;
	}

	deleteUser(id){
		//solo filtramos el usuario que se eliminará
		let deleteUser=this.getUser(id);
		//buscamos los usuarios cuyo id sea diferente al que queremos eliminar, 
		//por lo cual los registros filtrados se reemplazarán ahi mismo
		this.allusers=this.allusers.filter(user=>{
			return user.id!=id;
		})

		return deleteUser;
	}


}

module.exports={
	Users
}