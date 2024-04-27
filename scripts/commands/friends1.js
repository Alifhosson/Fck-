const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports.config = {
  name: "friend",
  version: "1.0.0",
  permssion: 0,
  credits: "Mohammad Nayan",
  description: "friends photo frame",
  category: "friends",
  prefix: true,
    cooldowns: 2,
};

  module.exports.run = async function({ api, event, args, Users, Threads, threadID, Currencies, senderID, messageID}) {
    
    const uid = event.senderID;
    const info = args.join(" ");
    var nn = await Users.getNameUser(uid);
  var nam = await Users.getNameUser(id);
  var ThreadInfo = await api.getThreadInfo(event.threadID);
    const apis = await axios.get('https://raw.githubusercontent.com/MR-NAYAN-404/NAYAN-BOT/main/api.json')
  const n = apis.data.api
    if (!info) {
      return api.sendMessage(`${nn}, Pleace Tag Your 2 Friends`, event.threadID);
    } else {
      var id = Object.keys(event.mentions)[0] || event.senderID;
      var ids = Object.keys(event.mentions)[1] || event.senderID;
      var name = await Users.getNameUser(id);
      var name2 = await Users.getNameUser(uid);
      var name3 = await Users.getNameUser(ids);

      api.sendMessage(`Processing your Image, please wait...`, event.threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 5000));

      const img = `${n}/nayan/friend?uid=${ids}&uid2=${uid}&uid3=${id}`;

      try {
        const response = await axios.get(img, { responseType: 'arraybuffer' });
        const image = await jimp.read(response.data);
        const outputPath = `./fbcoverv2_${uid}.png`;
        await image.writeAsync(outputPath);
        
        const attachment = fs.createReadStream(outputPath);
        api.sendMessage({ 
          body: `[💏]FRIEND 1. ${name2}\n[💏]FRIEND 2. ${name}\n[💏]FRIEND 3. ${name3}`,
          attachment
        }, event.threadID, () => fs.unlinkSync(outputPath));
      } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while generating the image.", event.threadID);
      }
    }
  }