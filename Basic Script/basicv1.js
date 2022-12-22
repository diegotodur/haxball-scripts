const roomName = "Todo Haxball Host";
document.title = roomName;
const maxPlayers = 20;
const roomPassword = null;
const roomPublic = true;
const token = "thr1.AAAAAGOjnxggTBEasjRf5A.u1GPogOIPTA"; // get you Haxball Token in https://www.haxball.com/headlesstoken 
const AnnounceColor = "0xB04A5E"
var room = HBInit({
	roomName: roomName,
	password: roomPassword,
	maxPlayers: maxPlayers,
	public: roomPublic,
	noPlayer: true,
	geo: { "code": "CL", "lat": -30, "lon": -70 },
	token: token,
});

room.setDefaultStadium("Big"); //Default Haxball Maps
room.setScoreLimit(3);
room.setTimeLimit(3);

function updateAdmins() { //Haxball Headless Documentation Example
  var players = room.getPlayerList();
  if ( players.length == 0 ) return; 
  if ( players.find((player) => player.admin) != null ) return; 
  room.setPlayerAdmin(players[0].id, true); 
}

room.onPlayerJoin = function(player) {
  updateAdmins();
  room.sendAnnouncement(`🛎 Bienvenido @${player.name}! unete a nuestro discord! discord.gg/example`, player.id, AnnounceColor, "normal");
}

room.onPlayerLeave = function(player) {
  updateAdmins();
}


