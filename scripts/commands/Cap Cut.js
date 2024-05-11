const fs = require("fs");
const axios = require("axios");
const request = require("request");
const tinyurl = require("tinyurl-api");

module.exports = {
  config: {
    name: "cap",
    version: "2.0.0",
    permission: 0,
    credits: "Rahad",
    description: "Download video from Capcut",
    prefix: true,
    category: "Public",
    usages: "link",
    cooldowns: 5,
    dependencies: {}
  },

  start: async function({ nayan, events, args }) {
    const { messageID, threadID } = events;
    const userMessage = args.join(" ");
    const templateUrlMatch = userMessage.match(/(https?:\/\/[^\s]+)/);
    const templateUrl = templateUrlMatch ? templateUrlMatch[0] : null;

    if (!templateUrl || !templateUrl.includes("capcut.com")) {
      return nayan.sendMessage("[ ! ] Invalid CapCut template link.", threadID, messageID);
    }

    try {
      nayan.sendMessage("Please wait, the video is being downloaded...", threadID, (err, info) => {
        if (err) {
          console.error(err);
          return;
        }
        setTimeout(() => { nayan.unsendMessage(info.messageID) }, 20000);
      }); 

      const res = await axios.get(`https://xnx-api-mdrahad1234561.replit.app/capcut/dl?url=${encodeURIComponent(templateUrl)}`);
      console.log(res.data);

      const file = fs.createWriteStream(__dirname + '/cache/tik.mp4');
      const shortenedUrl = await tinyurl(res.data.originalVideoUrl); 
      const play = res.data.originalVideoUrl;
      const title = res.data.title;
      const usage = res.data.usage;
      const description = res.data.description;
      const rqs = request(encodeURI(play));

      rqs.pipe(file);  
      file.on('finish', () => {
        setTimeout(function() {
          return nayan.reply({
            body: `TITLE: ${title}\n DESCRIPTION: ${description}\nUSAGE: ${usage}\n URL: ${shortenedUrl}`,
            attachment: fs.createReadStream(__dirname + '/cache/tik.mp4')
          }, threadID, messageID);
        }, 5000);
      });
    } catch (err) {
      console.error(err);
      nayan.reply(`An error occurred: ${err.message || err}`, threadID, messageID);  
    }
  }
};
