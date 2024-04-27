module.exports.config = {
  name: "🙂",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "🙂",
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
    if (body.startsWith("🙂")) {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var link = ["https://i.imgur.com/aqTp5Wl.mp4","https://i.imgur.com/YogNADv.mp4","https://i.imgur.com/fwD2iTc.mp4"];
    var callback = () => api.sendMessage({
      body: `- শেষ বেলায় আমিও শূন্য.!🥀💔\n- যাকে চেয়েছিলাম সে অন্য কাউকে নিয়ে পরিপূর্ণ.!🥀💔\n𝗔𝗹𝗶𝗳 𝗛𝗼𝘀𝘀𝗼𝗻🙃`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);
    const timeStart = Date.now();
    const PREFIX = config.PREFIX;
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", () => callback());
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
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["🙂"] == "undefined" || data["🙂"] == true) data["🙂"] = false;
  else data["🙂"] = true;
  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["🙂"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
