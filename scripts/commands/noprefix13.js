const fs = require("fs");

module.exports = {
  config: {
    name: "😅",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "",
    prefix: true, 
    category: "no prefix", 
    usages: "😅",
    cooldowns: 5,
    dependencies: {
      "request": null,
      "fs-extra": null,
      "axios": null
    }
  },

  handleEvent: function ({ api, event, client, __GLOBAL }) {
    const { threadID, messageID } = event;
    const content = event.body ? event.body : '';
    const body = content.toLowerCase();
    
    // Check if the message starts with the 😅 emoji
    if (body.startsWith("😅")) {
      var msg = {
        body: "━✿᭄আমাকে ছেড়ে গেলে হয়তো༎ আমার থেকে বেটার পাইবা❥᭄ꦿ🦋🥀-- 😊        💔 🌺____কিন্তু মনে রেখ,༎  আমার মতো ভালো তোমাকে কেউ বাসতে পারবেনা❥᭄__🖤🥀",
        attachment: fs.createReadStream(__dirname + `/noprefix/Bkcp.mp4`),
      };
      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("💔", event.messageID, (err) => {}, true);
    }
  },

  // Removed unnecessary parameter from start function
  start: function () {},
};
