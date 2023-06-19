const roomName = "Haxball Headless by itsmisce";
document.title = roomName;
const maxPlayers = 10; //max 30 players
const roomPassword = null; //change for your password if you liked. like this: const roomPassword = "mypassword";
const roomPublic = true; //false for privated room, true for public room
const token = ""; // get you Haxball Token in https://www.haxball.com/headlesstoken 

let colors = {
  announce: "0xB04A5E"
}
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
  let players = room.getPlayerList();
  if (players.length == 0) return;
  if (players.find((player) => player.admin) != null) return;
  room.setPlayerAdmin(players[0].id, true);
}

room.onPlayerJoin = function (player) {
  updateAdmins();
  room.sendAnnouncement(`🛎 Bienvenido @${player.name}! unete a nuestro discord! discord.gg/example`, player.id, colors.announce, "normal");
}

room.onPlayerLeave = function (player) {
  updateAdmins();
}


