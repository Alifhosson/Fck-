module.exports.config = {
  name: "🍼",
  version: "1.0.0", 
  permission: 0,
  credits: "Rahad",
  description: "Sends a lovely message with a video attachment.",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event }) {
  const fs = require("fs"); 

  const content = event.body ? event.body.toLowerCase() : '';
  
  if (content.startsWith("🍼")) {
    const msg = { 
      body: "- এই নাও বাবু পিটার খাও-🍼",
      attachment: fs.createReadStream(__dirname + `/noprefix/pidar.mp3`),
    };

    api.sendMessage(msg, event.threadID, event.messageID);
    api.setMessageReaction("🍼", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event }) {

};
