const axios = require("axios");
const fs = require("fs");
const request = require("request");

const link = [
"https://i.imgur.com/6K9cDyL.mp4",
"https://i.imgur.com/bqCEwuu.mp4",
"https://i.imgur.com/bVH4f46.mp4",
"https://i.imgur.com/qPh4oyr.mp4",
"https://i.imgur.com/GCLZnbZ.mp4",
"https://i.imgur.com/UVrlcB1.mp4",
"https://i.imgur.com/omskdAn.mp4",
"https://i.imgur.com/Y3sqB57.mp4",
"https://i.imgur.com/kFKfv8x.mp4",
"https://i.imgur.com/zKebMTz.mp4",
"https://i.imgur.com/EP9wM2N.mp4",
"https://i.imgur.com/HMwN8OL.mp4",
"https://i.imgur.com/XxITjrv.mp4",
"https://i.imgur.com/CvtSpsW.mp4",
"https://i.imgur.com/IcZPG93.mp4",
"https://i.imgur.com/fNUCJyO.mp4",
"https://i.imgur.com/IzEgoLX.mp4",
"https://i.imgur.com/Z20dnBL.mp4",
"https://i.imgur.com/OjX8QX9.mp4",
"https://i.imgur.com/Z5mvb0F.mp4",
"https://i.imgur.com/RGMShBd.mp4",
"https://i.imgur.com/ylJZiIi.mp4",
"https://i.imgur.com/I5GwMwD.mp4",
"https://i.imgur.com/oNbNBTW.mp4",
"https://i.imgur.com/sFhgEuB.mp4",
"https://i.imgur.com/vKMK956.mp4",
"https://i.imgur.com/xmQzhhD.mp4",
 
];

module.exports.config = {
  name: "🥵",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "🥵",
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
  if (body.startsWith("🥵")) {
    const rahad = [
      "ভালো হয়ে জা লুচ্চা🥵😁😁",
      " নে দেখ লুচ্চা😁🥵"
    
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
  if (typeof data["🥵"] === "undefined" || data["🥵"]) data["🥵"] = false;
  else data["🥵"] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["🥵"]) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};