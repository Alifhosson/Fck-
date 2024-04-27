module.exports.config = {
  name: "💔",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "💔",
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
  if (body.startsWith("💔")) {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var rahad = [
      "🐹!<-‘🍒✨. !’-” \n•⎯͢⎯⃝🩵‎‎‎‎‎‎রাখার মানুষ রাখ'তে জান'লে থাকা'র\nমানুষ থাকতে বাধ্য‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎༉⎯͢⎯⃝🩵😊🌺-:))",
      "🥀দুনিয়া টা মিথ্যা ভালোবাসায় আসক্ত💔💚\n            💕নতুন কিছু আসলে🙂🙃\n      আগের সব বিষাক্ত🥰💯"
    ];
    
    var rahad2 = rahad[Math.floor(Math.random() * rahad.length)];
 
    var link = ["https://i.imgur.com/QcVFGpm.mp4", "https://i.imgur.com/GL1HV0V.mp4"];
    var callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.mp4")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp4"), event.messageID);
    
    const requestStream = request(encodeURI(link[Math.floor(Math.random() * link.length)]));
    requestStream.pipe(fs.createWriteStream(__dirname + "/cache/2024.mp4")).on("close", () => callback());
    return requestStream;
  }
};
module.exports.run = async ({ api, event, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["💔"] == "undefined" || data["💔"] == true) data["💔"] = false;
  else data["💔"] = true;
  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["💔"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
