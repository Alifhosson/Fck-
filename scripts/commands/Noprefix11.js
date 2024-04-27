const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
"https://i.imgur.com/tedBxXz.mp4",
"https://i.imgur.com/5E0sauL.mp4",
"https://i.imgur.com/bqCEwuu.mp4",
"https://i.imgur.com/w5DW0ar.mp4",
"https://i.imgur.com/hD28em1.mp4",
"https://i.imgur.com/avaKF6v.mp4",
"https://i.imgur.com/TmJe5a1.mp4",
"https://i.imgur.com/utOCrsi.mp4",
"https://i.imgur.com/52teYtL.mp4",
"https://i.imgur.com/BIqMqM1.mp4",
"https://i.imgur.com/DDs78vx.mp4",
"https://i.imgur.com/qyX7Z8L.mp4",
"https://i.imgur.com/IzEgoLX.mp4",
"https://i.imgur.com/Ql8jgNq.mp4",
"https://i.imgur.com/PIHFTTz.mp4",
"https://i.imgur.com/BQOw4V2.mp4",
"https://i.imgur.com/Is9sLgx.mp4",
"https://i.imgur.com/FkB05ez.mp4",
"https://i.imgur.com/ZHFe1XF.mp4",
"https://i.imgur.com/8dLoUPH.mp4",
"https://i.imgur.com/V0Jlikk.mp4",
"https://i.imgur.com/bacE6mL.mp4",
"https://i.imgur.com/lKLkIxx.mp4",
"https://i.imgur.com/1jTxC8L.mp4",
"https://i.imgur.com/vxCDlNN.mp4",
"https://i.imgur.com/ez6Yq9h.mp4",
"https://i.imgur.com/cIY4Fq5.mp4",
"https://i.imgur.com/S7Unrvm.mp4",
"https://i.imgur.com/V4ZATA5.mp4",
"https://i.imgur.com/wrUU3Dy.mp4",

];

module.exports.config = {
  name: "😒",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "😒",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
  const content = event.body ? event.body : '';
    const body = content.toLowerCase();
  if (body.startsWith("😒")) {
    const rahad = [
      "_ওই দিকে কি দেখো এ দিকে দেখো..!🫂😍",
      " উম্মম্মমমমমমহহহ..বেবি ওই দিকে কি 😒"
    
    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];

    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);
    
    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", () => callback());
    return requestStream;
  }
};

module.exports.languages = {
  "vi": {
    "on": "Dùng sai cách rồi lêu lêu",
    "off": "sv ngu, đã bão dùng sai cách",
    "successText": `🧠`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["😒"] === "undefined" || data["😒"]) data["😒"] = false;
  else data["🙄"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["😒"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};





"https://i.imgur.com/tedBxXz.mp4","https://i.imgur.com/5E0sauL.mp4","https://i.imgur.com/bqCEwuu.mp4","https://i.imgur.com/w5DW0ar.mp4","https://i.imgur.com/hD28em1.mp4","https://i.imgur.com/avaKF6v.mp4","https://i.imgur.com/TmJe5a1.mp4","https://i.imgur.com/utOCrsi.mp4","https://i.imgur.com/52teYtL.mp4","https://i.imgur.com/BIqMqM1.mp4","https://i.imgur.com/DDs78vx.mp4","https://i.imgur.com/qyX7Z8L.mp4","https://i.imgur.com/IzEgoLX.mp4","https://i.imgur.com/Ql8jgNq.mp4","https://i.imgur.com/PIHFTTz.mp4","https://i.imgur.com/BQOw4V2.mp4","https://i.imgur.com/Is9sLgx.mp4","https://i.imgur.com/FkB05ez.mp4","https://i.imgur.com/ZHFe1XF.mp4","https://i.imgur.com/8dLoUPH.mp4","https://i.imgur.com/V0Jlikk.mp4","https://i.imgur.com/bacE6mL.mp4","https://i.imgur.com/lKLkIxx.mp4","https://i.imgur.com/1jTxC8L.mp4","https://i.imgur.com/vxCDlNN.mp4","https://i.imgur.com/ez6Yq9h.mp4","https://i.imgur.com/cIY4Fq5.mp4","https://i.imgur.com/S7Unrvm.mp4","https://i.imgur.com/V4ZATA5.mp4","https://i.imgur.com/wrUU3Dy.mp4","https://i.imgur.com/y6ObvT3.mp4","https://i.imgur.com/jdIdLYo.mp4","https://i.imgur.com/RAxJxRQ.mp4","https://i.imgur.com/h5CCP73.mp4","https://i.imgur.com/lub1znh.mp4",
