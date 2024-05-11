const axios = require('axios');
const { unlinkSync, writeFileSync, createReadStream } = require('fs-extra');

module.exports.config = {
    name: "stalk",
    version: "1.0.0",
    author: "RUBISH",
    permission: 1,
    description: "Retrieve information about a user on Facebook.",
    commandCategory: "Information",
    usage: "/stalk <@mention or reply to a message of the user>",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function ({ api, args, event }) {
    let userId;
    if (event.mentions || event.type === "message_reply") {
        userId = Object.keys(event.mentions)[0] || event.messageReply.senderID;
    } else if (!args[0]) {
        userId = event.senderID;
    } else {
        userId = args.join(" ");
    }
    try {
        const response = await axios.get(`https://noobs-api.onrender.com/dipto/fbinfo?id=${userId}&key=dipto008`);
        const apiResponse = response.data;
        const path = __dirname + '/cache/stalk.jpg';
        const imgResponse = await axios.get(apiResponse.photo, { responseType: "arraybuffer" });
        
        if (!imgResponse.data) {
            throw new Error("Failed to fetch image data.");
        }

        writeFileSync(path, Buffer.from(imgResponse.data, 'binary'));

        const formattedResponse = `
╠    𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞    ╣
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

• 𝗡𝗮𝗺𝗲: ${apiResponse.name}
• 𝗙𝗶𝗿𝘀𝘁 𝗡𝗮𝗺𝗲: ${apiResponse.fast}
• 𝗨𝘀𝗲𝗿 𝗜𝗗: ${apiResponse.uid}
...
`;

        await api.sendMessage({
            body: formattedResponse,
            attachment: createReadStream(path)
        }, event.threadID, () => unlinkSync(path), event.messageID);
    } catch (error) {
        console.error('Error fetching stalk data:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
};
