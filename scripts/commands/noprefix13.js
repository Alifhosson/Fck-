const fs = require("fs");

module.exports = {
  config: {
    name: "",
    version: "1.0.1",
    prefix: false,
    permission: 0, // Fixed typo here
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😅",
    cooldowns: 5,
  },

  handleEvent: function ({ api, event, client, __GLOBAL }) {
    const { threadID, messageID } = event;
    const content = event.body ? event.body : '';
    const body = content.toLowerCase();
    
    // Check if the message starts with a space or the 😅 emoji
    if (body.startsWith(" ") || body.startsWith("😅")) {
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
