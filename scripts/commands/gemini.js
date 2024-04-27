const puppeteer = require('puppeteer');

module.exports.config = {
    name: "gemini",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "this command will help you to answer your questions!",
    prefix: true,
    category: "Artificial Intelligence",
    usages: "(name_of_cmd) [query]",
    cooldowns: 0,
    dependencies: {}
};  
  
module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
    let prompt = args.join(" "),
      uid = event.senderID,
      url;
    if (!prompt) return api.sendMessage(`Please enter a prompt.`, event.threadID, event.messageID);
    
    try {
      const apis = `https://gemini-api.replit.app`;
      if (event.type == "message_reply"){
        if (event.messageReply.attachments[0]?.type == "photo"){
        url = encodeURIComponent(event.messageReply.attachments[0].url);
        const res = (await axios.get(apis + "/gemini?prompt="+prompt+"&url="+url+"&uid="+uid)).data;
        return api.sendMessage(`${res.gemini}`, event.threadID, event.messageID)
        } else {
          return api.sendMessage('Please reply to an image.', event.threadID, event.messageID)
        }
      }
      const rest = (await axios.get(apis + "/gemini?prompt=" + prompt + "&uid=" + uid)).data;
      return api.sendMessage(rest.gemini, event.threadID, event.messageID)
    } catch (e) {
      console.log(e);
      return api.sendMessage(e.message, event.threadID, event.messageID);
    } //end of catch
  };
