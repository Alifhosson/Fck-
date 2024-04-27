const fs = require("fs");
module.exports.config = {
  name: "💏",
  version: "1.0.0", 
  permission: 0,
  credits: "Rahad",
  description: "", 
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5, 
  
};

module.exports.handleEvent = function({ api, event }) {
  const content = event.body ? event.body.toLowerCase() : '';
  
  if (content.startsWith("😘")) {
		var msg = {
				body: "- আমি চাই তুমি একান্তই আমার হও, একান্তই আমার 🤎🧡\n𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻 😻",
				attachment: fs.createReadStream(__dirname + `/noprefix/rahad10.mp4`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😻", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
