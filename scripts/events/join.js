const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const axios = require('axios');
const jimp = require("jimp");
const fontlink = 'https://drive.google.com/u/0/uc?id=10XFWm9F6u2RKnuVIfwoEdlav2HhkAUIB&export=download';

module.exports.circle = async (image) => {
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

module.exports.run = async function({ api, event, Users }) {
  const moment = require("moment-timezone");
  const { threadID } = event;
  const threadInfo = await api.getThreadInfo(threadID);
  const threadName = threadInfo.threadName;

  if (!event.logMessageData.addedParticipants || !Array.isArray(event.logMessageData.addedParticipants)) {
    return;
  }

  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    let gifUrl = 'https://i.imgur.com/wrGpvmQ.mp4';
    let gifPath = __dirname + '/Nayan/join/join.gif';

    try {
      const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(gifPath, response.data);
      await api.sendMessage("চলে এসেছি আমি আলিফের পিচ্চ বট তোমাদের মাঝে-😚😉🥀", event.threadID);
      await api.sendMessage({
        body: `${global.config.BOTNAME} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 
        <------------------------------>  
        𝗕𝗼𝘁 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹 !!! 

        𝗔𝗽𝗽𝗿𝗼𝘃𝗮𝗹 𝗔𝗹𝗹𝗼𝘄 𝗜𝗻 𝗧𝗵𝗶𝘀 𝗚𝗿𝗼𝘂𝗽 !!!
        <------------------------------>

        𝗨𝘀𝗲 𝗛𝗲𝗹𝗽 𝗧𝗼 𝗦𝗲𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 
        \n\n𝗨𝘀𝗲 ${global.config.PREFIX}𝗛𝗲𝗹𝗽 𝗧𝗼 𝗦𝗲𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀.
        \n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:
        ${global.config.PREFIX}𝗛𝗮𝗱𝗶𝘀(𝗧𝗲𝘅𝘁)
        ${global.config.PREFIX}𝗦𝘁𝗮𝘁𝘂𝘀 (𝗦𝘁𝗮𝘁𝘂𝘀 𝘃𝗶𝗱𝗲𝗼)
        ${global.config.PREFIX}𝗛𝗲𝗹𝗽 (𝗖𝗼𝗺𝗺𝗮𝗻𝗱)
        ${global.config.PREFIX}𝗜𝗻𝗳𝗼 
        <<<<<------------------------------>>>>>
        𝗔𝗻𝗱 𝗙𝗼𝗿 𝗔𝗻𝘆 𝗥𝗲𝗽𝗼𝗿𝘁 𝗢𝗿 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗕𝗼𝘁 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿

        ۞ 𝗢𝘄𝗻𝗲𝗿 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻

        ✷ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: 
        https://www.facebook.com/Alifhosson.xxx?mibextid=ZbWKwL

        ❊ 𝗣𝗮𝗿𝘀𝗼𝗻𝗮𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : m.me/Alifhosson.xxx

        ✲ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺: t.me/alifhosson

        ❁ 𝗘𝗺𝗮𝗶𝗹: alifhosson5@gmail.com

        ✿ 𝗪𝗣: 01615623399`,
        attachment: fs.createReadStream(gifPath)
      }, threadID);
    } catch (error) {
      console.error("Error downloading GIF:", error);
    }
  } else {
    try {
      if (!fs.existsSync(__dirname + `/Nayan/font/Semi.ttf`)) {
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/Nayan/font/Semi.ttf`, Buffer.from(getfont, "utf-8"));
      };
      const { createReadStream } = fs;
      let { participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [];
      var abx = [];

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - id);
      }

      for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
        let pathImg = __dirname + `/Nayan/join/${o}.png`;)
      }
    } catch (e) { return console.log(e) };
  }
}
