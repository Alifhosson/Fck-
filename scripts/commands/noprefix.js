const fs = require("fs");

module.exports.config = {
  name: "😍",
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
  const content = event.body ? event.body.toLowerCase() : '';
  
  if (content.startsWith("😍")) {
    const msg = {
      body: "         KINNA SONA🖤 \n\n𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻👑",
      attachment: fs.createReadStream(__dirname + "/noprefix/Rahad19.mp4")
    };

    api.sendMessage(msg, event.threadID, event.messageID);
    api.setMessageReaction("😍", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event }) {

};
