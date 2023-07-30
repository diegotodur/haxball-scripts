class Config {
	constructor() {
	  this.roomName = 'Haxball Scripts';
	  this.password = '123456';
	  this.maxPlayers = 10;
	  this.noPlayer = true;
	  this.public = false;
  
	  //Puedes agregar mas colores con el formato 0xHedecimal, luego puedes llamarlo en tus funciones como getColor('nombre')
	  this.colores = {
		anuncio: '0x5190CE',
		golRed: '0xC93C3C',
	  };
  
	  //Puedes agregar mas mensajes, luego puedes llamarlo en tus funciones como getMessage('nombre')
	  this.mensajes = {
		anuncioBienvenida: ', bienvenido a la sala!',
	  };
	}

	getColor(key) {
	  return this.colores[key];
	}
	getMessage(key) {
	  return this.mensajes[key];
	}
}
const config = new Config();
const { getColor, getMessage } = config;


//Funcion para mandar anuncios
const announce = (msg, targetId, color =  config.getColor('anuncio'), style = "normal", sound = 0) => {
	room.sendAnnouncement(msg, targetId, color, style, sound);
};

//Actualizar admins
const updateAdmins = () => {
	var players = room.getPlayerList();
	if (players.length == 0) return;
	if (players.find((player) => player.admin) != null) return;
	room.setPlayerAdmin(players[0].id, true);
}

//Si la sala esta vacia, se pausa el juego.
const pausarSalaVacia = () => {
	var players = room.getPlayerList();
 	if ( players.length == 0 ){
		room.stopGame()
	}
}


const room = HBInit({
	roomName: config.roomName,
	maxPlayers: config.maxPlayers,
	noPlayer: config.noPlayer,
	public: config.public,
	password: config.password
});


const players = []

room.onPlayerJoin = function (player) {
	updateAdmins();

	const auth = player.auth;
	const nombre = player.name
	const msj = `Hola ${player.name}, ${config.getMessage('anuncioBienvenida')}`;
	announce(msj, player.id);

	const playerObject = {
      id: player.id,
      name: nombre,
      auth: auth
    };

	players.push(playerObject)
}

room.onPlayerLeave = function (player) {
	updateAdmins();
	pausarSalaVacia();
}