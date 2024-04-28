module.exports.config = {
  name: "join",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Mirai-Team",
  description: "GROUP UPDATE NOTIFICATION"
};

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

let suffix;

module.exports.run = async function({ api, event, Users }) {
  const fullYear = global.client.getTime("fullYear");
  const getHours = await global.client.getTime("hours");
  const session = `${getHours < 3 ? "midnight" : getHours < 8 ? "Early morning" : getHours < 12 ? "noon" : getHours < 17 ? "afternoon" : getHours < 23 ? "evening" : "midnight"}`;
  const moment = require("moment-timezone");
  let thu = moment.tz('Asia/dhaka').format('dddd');
  const time = moment.tz("Asia/dhaka").format("HH:mm:ss - DD/MM/YYYY");
  const { threadID } = event;

  if (!event.logMessageData.addedParticipants || !Array.isArray(event.logMessageData.addedParticipants)) {
    return;
  }

  if (event.logMessageData.addedParticipants && Array.isArray(event.logMessageData.addedParticipants) && event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    let gifUrl = 'https://i.imgur.com/pI1FkGV.mp4';
    let gifPath = __dirname + '/Nayan/join/join.gif';

    axios.get(gifUrl, { responseType: 'arraybuffer' })
      .then(response => {
        fs.writeFileSync(gifPath, response.data);
        return api.sendMessage("চলে এসেছি আমি আলিফের পিচ্চ বট তোমাদের মাঝে-😚😉🥀", event.threadID, () => api.sendMessage({ body: `${global.config.BOTNAME} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ↤
           🌱আঁ'স্ঁ'সা্'লা্'মু্ঁ ও্ঁ'য়া্'লা্'ই্ঁ'কু্'ম্ঁ🥀🌼
<------------------------------>  
𝗕𝗼𝘁 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝗦𝘂𝗰𝗰𝗲𝘀𝗳𝘂𝗹 !!! 

𝗔𝗽𝗽𝗿𝗼𝘃𝗮𝗹 𝗔𝗹𝗹𝗼𝘄 𝗜𝗻 𝗧𝗵𝗶𝘀 𝗚𝗿𝗼𝘂𝗽 !!!
<------------------------------>

𝗨𝘀𝗲 𝗛𝗲𝗹𝗽 𝗧𝗼 𝗦𝗲𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 
\n\n𝗨𝘀𝗲 ${global.config.PREFIX}𝗛𝗲𝗹𝗽 𝗧𝗼 𝗦𝗲𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀.\n\n𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n${global.config.PREFIX}𝗛𝗮𝗱𝗶𝘀(𝗧𝗲𝘅𝘁)\n${global.config.PREFIX}𝗦𝘁𝗮𝘁𝘂𝘀 (𝗦𝘁𝗮𝘁𝘂𝘀 𝘃𝗶𝗱𝗲𝗼)\n${global.config.PREFIX}𝗛𝗲𝗹𝗽 (𝗖𝗼𝗺𝗺𝗮𝗻𝗱)\n${global.config.PREFIX}𝗜𝗻𝗳𝗼 
<<<<<------------------------------>>>>>
𝗔𝗻𝗱 𝗙𝗼𝗿 𝗔𝗻𝘆 𝗥𝗲𝗽𝗼𝗿𝘁 𝗢𝗿 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗕𝗼𝘁 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿

۞ 𝗢𝘄𝗻𝗲𝗿 : 𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻

✷ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: 
https://www.facebook.com/Alifhosson.xxx?mibextid=ZbWKwL

❊ 𝗣𝗮𝗿𝘀𝗼𝗻𝗮𝗹 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : m.me/Alifhosson.xxx

✲ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺: t.me/alifhosson

❁ 𝗘𝗺𝗮𝗶𝗹: alifhosson5@gmail.com

✿ 𝗪𝗣: 016156233399`, attachment: fs.createReadStream(gifPath)}, threadID));
})
.catch(error => {
    console.error(error);
});
  }
  else {
    try {
      if (!fs.existsSync(__dirname + `/Nayan/font/Semi.ttf`)) {
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/Nayan/font/Semi.ttf`, Buffer.from(getfont, "utf-8"));
      };
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
      var abx = [];
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
      }
      // console.log(event.logMessageData.addedParticipants)
      var id = [];
      for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
        let pathImg = __dirname + `/Nayan/join/${o}.png`;
        let pathAva = __dirname + `/Nayan/join/avt.png`;
        let avtAnime = (await axios.get(encodeURI(
          `https://graph.facebook.com/${event.logMessageData.addedParticipants[o].userFbId}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`), { responseType: "arraybuffer" })).data;
        var ok = [
          'https://i.imgur.com/dDSh0wc.jpeg',
          'https://i.imgur.com/UucSRWJ.jpeg',
          'https://i.imgur.com/OYzHKNE.jpeg',
          'https://i.imgur.com/V5L9dPi.jpeg',
          'https://i.imgur.com/M7HEAMA.jpeg'
        ]
        let background = (await axios.get(encodeURI(`${ok[Math.floor(Math.random() * ok.length)]}`), { responseType: "arraybuffer", })).data;
        fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
        var avatar = await this.circle(pathAva);
        let baseImage = await loadImage(pathImg);
        let baseAva = await loadImage(avatar);
        registerFont(__dirname + `/Nayan/font/Semi.ttf`, {
          family: "Semi"
        });
        let canvas = createCanvas(1902, 1082);
        console.log(canvas.width, canvas.height)
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseAva, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.font = `155px Semi`;
        ctx.fillText(`${event.logMessageData.addedParticipants[o].fullName}`, canvas.width / 2 + 20, canvas.height / 2 + 100);
        ctx.save();
        ctx.font = `75px Semi`;
        ctx.fillText(`Welcome to ${threadName}`, canvas.width / 2 - 15, canvas.height / 2 + 235)
        const number = participantIDs.length - o;

        if (number === 11 || number === 12 || number === 13) {
          suffix = "th";
        } else {
          const lastDigit = number % 10;
          switch (lastDigit) {
            case 1:
              suffix = "st";
              break;
            case 2:
              suffix = "nd";
              break;
            case 3:
              suffix = "rd";
              break;
            default:
              suffix = "th";
              break;
          }
        }

        ctx.fillText(`You are the ${number}${suffix} member of this group`, canvas.width / 2 - 15, canvas.height / 2 + 350);
        ctx.restore();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        abx.push(fs.createReadStream(__dirname + `/Nayan/join/${o}.png`))
      }
      memLength.sort((a, b) => a - b);
      (typeof threadData.customJoin == "undefined") ? msg = `Hello {name}\nWelcome to {threadName}\nyou're the {soThanhVien}th member on this group please enjoy"\n─────────────────\n[ {time} - {thu} ]` : msg = threadData.customJoin;
      var nameAuthor = await Users.getNameUser(event.author)
      msg = msg
        .replace(/\{iduser}/g, iduser.join(', '))
        .replace(/\{name}/g, nameArray.join(', '))
        .replace(/\{type}/g, (memLength.length > 1) ? 'You' : 'You')
        .replace(/\{soThanhVien}/g, memLength.join(', '))
        .replace(/\{threadName}/g, threadName)
        .replace(/\{author}/g, nameAuthor)
        .replace(/\{uidAuthor}/g, event.author)
        .replace(/\{buoi}/g, session)
        .replace(/\{time}/g, time)
        .replace(/\{thu}/g, thu);

      var formPush = { body: msg, attachment: abx, mentions }
      api.sendMessage(formPush, threadID);
      for (let ii = 0; ii < parseInt(id.length); ii++) {
        fs.unlinkSync(__dirname + `/Nayan/join/${ii}.png`)
      }
    } catch (e) { return console.log(e) };
  }
}
