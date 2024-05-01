module.exports = {
  config:{
     name: "speech",
     version: "1.0.0",
     permission: 0,
     credits: "NAYAN",
     prefix: 'awto',
     description: "text to voice",
     category: "user",
     usages: "text",
     cooldowns: 0,
     dependencies: {
       "fs": "",
       "axios": "",
       "nayan-server": "^2.3.3"
     },
    envConfig: {
      name: 'Nabanita'
    }
},

  languages: {
  "vi": {},
      "en": {
        "error": '❌ Something Went Wrong🐱'
      }
  },
start: async function ({ nayan, args, events, lang }) {
  try {
    const { text2voice } = require('nayan-server');
    const axios = require('axios');
    const fs = require('fs');
    var content = (events.type == "message_reply") ? events.messageReply.body : args.join(" ");
    const name = 'Nabanita'
    const d = await text2voice(content, global.configModule[this.config.name].name);
    console.log(d)
    var audioss = []
    const voice = d.url;
    var { data } = await axios.get(voice, { method: 'GET', responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + "/cache/text2voice.m4a", Buffer.from(data, 'utf-8'));
    audioss.push(fs.createReadStream(__dirname + "/cache/text2voice.m4a"));
    var msg = { body: content, attachment: audioss }
    nayan.reply(msg, events.threadID, events.messageID)
  } catch (error) {
    nayan.reply(lang("error"), events.threadID, events.messageID)
  }
}
}
