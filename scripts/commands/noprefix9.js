module.exports.config = {
  name: "🥰",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  category: "no prefix", 
  usages: "🥰",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
  var rahad3 = ["😚","😀","😃","🖤","😁","😉","😗","😙","😘","🥰","😍","🤩","🥳","🙃","🙂","🥲","😊","☺️","😌","❤️","😏","🤤","😋","😛","🤪","💛","😜","💕","😝","🥴","😔","🥺","😬","🔥","💩","😐","💝","😶","🤐","🤔","🥀","🐱","🐒","🍼","🤰","❤️‍💋‍","👨","🙆","🤫","🤭","🥱","🤗","😱","🤨","😒","💖","🙄","💋","😞","😓","💙","😟","😥","🫂","😢","☹️","🙁","😕","😨","😲","😮","😯","😦","😧","😳","🤯","😖","😣","😩","😵","🥵","🥶","🤢","🤮","😴","😪","🤧","🤒","🤕","😷","🤥","😇","🤓","👻","🌚","🙊","🙉","🙈","🌝","🙀","😽","😼","😻","🔪","🐸","🐥","🐣","🎉","💉","🕓","🕗","🕙","🕕","🔍","🔎","📢","❌","🚫","📴","🎵","🕝"];
  var rahad4 = rahad3[Math.floor(Math.random() * rahad3.length)];

  api.setMessageReaction(rahad4, event.messageID, (err) => {
    if (err) {
      console.error("Error sending reaction:", err);
    }
  }, true);

  api.sendTypingIndicator(event.threadID, true);
  
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
  if (body.startsWith("🥰")) {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var rahad = [
      "_জীবনে খুব সাধারণ একটা  মা'নুষ আসুক-:))💜🍂\n\n     _যে আমায় ছাড়া কিছু না বুঝুক-!🖤🥺",
      "____𝘀𝗼𝗺𝗲𝗼𝗻𝗲 𝗶𝘀 𝗯𝘂𝘀𝘆 𝗳𝗶𝗻𝗱𝗶𝗻𝗴 𝗻𝗲𝘄 𝗔𝗻𝗱 𝘀𝗼𝗺𝗲𝗼𝗻𝗲 𝗶𝘀 𝘂𝗲𝘀𝗱 𝘁𝗼 𝘁𝗵𝗲 𝗼𝗹𝗱-!!💚🌼🍒\n\n___কেউ নতুন খুঁজতে ব্যাস্ত আর কেউ পুরোনো তেই অভ্যস্ত-!!💚🌼🍒"
    ];
    
    var rahad2 = rahad[Math.floor(Math.random() * rahad.length)];
 
    var link = ["https://i.imgur.com/InM9H6d.mp4", "https://i.imgur.com/C56UlOc.mp4"];
    var callback = () => api.sendMessage({
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
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["🥰"] == "undefined" || data["🥰"] == true) data["🥰"] = false;
  else data["🥰"] = true;
  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${(data["🥰"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};