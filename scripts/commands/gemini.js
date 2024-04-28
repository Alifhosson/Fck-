const axios = require("axios");

module.exports.config = {
    name: "gemini",
    version: "1.0",
    credits: "Dipto",
    description: "gemeini ai",
  prefix: true,
    cooldowns: 5,
    role: 0,
    category: "google",
    usages: "{pn} message | photo reply",
};

module.exports.run = async function ({ api, args, event }) {
    const prompt = args.join(' ');
    //---- Image Reply -----//
    if (event.type === "message_reply") {
        var t = event.messageReply.attachments[0].url;
        try {
            const response = await axios.get(`https://noobs-api.onrender.com/dipto/gemini?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(t)}`)
            const data2 = response.data.dipto;
            api.sendMessage(data2, event.threadID, event.messageID);
        } catch (error) {
            console.error('Error:', error.message);
            api.sendMessage(error, event.threadID, event.messageID);
        }
    }
    //---------- Message Reply ---------//
    else if (!prompt) {
        return api.sendMessage('Please provide a prompt or message reply', event.threadID, event.messageID);
    } else {
        try {
            const response = await axios.get(`https://noobs-api.onrender.com/dipto/gemini?prompt=${encodeURIComponent(prompt)}`)
            const message = response.data.dipto;
            api.sendMessage(message, event.threadID, event.messageID);
        } catch (error) {
            console.error('Error calling Gemini AI:', error);
            api.sendMessage(`Sorry, there was an error processing your request. ${error}`, event.threadID, event.messageID);
        }
    }
};
