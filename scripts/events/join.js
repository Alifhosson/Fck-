module.exports.run = async function ({ api, event }) {
  const { threadID } = event;

  try {
    if (!event.logMessageData.addedParticipants || !Array.isArray(event.logMessageData.addedParticipants)) {
      return;
    }

    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
      const gifUrl = 'https://i.imgur.com/wrGpvmQ.mp4';
      const gifPath = __dirname + '/Nayan/join/join.gif';

      const response = await axios.get(gifUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(gifPath, response.data);

      await api.sendMessage("চলে এসেছি আমি আলিফের পিচ্চ বট তোমাদের মাঝে-😚😉🥀", threadID);
      
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
    }
  } catch (error) {
    console.error("Error downloading GIF:", error);
  }

  // The rest of your code...
}
