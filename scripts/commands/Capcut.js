const fs = require("fs");
const axios = require("axios");
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
      return nayan.sendTextMessage("[ ! ] Invalid CapCut template link.", threadID);
    }

    try {
      nayan.sendTextMessage("Please wait, the video is being downloaded...", threadID);

      const res = await axios.get(`https://xnx-api-mdrahad1234561.replit.app/capcut/dl?url=${encodeURIComponent(templateUrl)}`);
      console.log(res.data);

      const file = fs.createWriteStream(__dirname + '/cache/tik.mp4');
      const shortenedUrl = await tinyurl(res.data.originalVideoUrl);
      const title = res.data.title;
      const usage = res.data.usage;
      const description = res.data.description;

      const rqs = axios.get(res.data.originalVideoUrl, { responseType: 'stream' });
      rqs.data.pipe(file);

      file.on('finish', () => {
        setTimeout(() => {
          nayan.sendMessage(`TITLE: ${title}\nDESCRIPTION: ${description}\nUSAGE: ${usage}\nURL: ${shortenedUrl}`, threadID, { attachment: fs.createReadStream(__dirname + '/cache/tik.mp4') });
        }, 5000);
      });
    } catch (err) {
      console.error(err);
      nayan.sendMessage(`An error occurred: ${err.message || err}`, threadID);
    }
  }
};
