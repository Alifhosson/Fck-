const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const url = require('url');

module.exports.config = {
    name: "stalk",
    version: "1.0.0",
    permission: 1,
    credits: "Alif",
    description: "Retrieve information about a user on Facebook.",
    prefix: true, 
    category: "Info", 
    usages: "/stalk <@mention or reply to a message of the user>",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports = {
    config: {
        name: "stalk",
        aliases: [],
        version: "1.0", 
        author: "RUBISH",
        description: {
            vi: "Thu thập thông tin từ một người dùng trên Facebook.",
            en: "Retrieve information about a user on Facebook."
        },
        category: "Tools",
        guide: {
            vi: "{pn} <@mention hoặc trả lời tin nhắn của người dùng>",
            en: "{pn} <@mention or reply to a message of the user>"
        }
    },

    onStart: async function ({ api, args, event }) {
        let userId;
        let userName;

        try {
            if (event.type === "message_reply") {
                userId = event.messageReply.senderID;
                const user = await api.getUserInfo(userId);
                userName = user[userId].name;
            } else {
                const input = args.join(" ");

                if (event.mentions && Object.keys(event.mentions).length > 0) {
                    userId = Object.keys(event.mentions)[0];
                    const user = await api.getUserInfo(userId);
                    userName = user[userId].name;
                } else if (/^\d+$/.test(input)) {
                    userId = input;
                    const user = await api.getUserInfo(userId);
                    userName = user[userId].name;
                } else if (input.includes("facebook.com")) {
                    const { findUid } = global.utils;
                    let linkUid;
                    try {
                        linkUid = await findUid(input);
                    } catch (error) {
                        console.error(error);
                        return api.sendMessage(
                            "⚠️ |  I couldn't find the user ID from the provided link. Please try again with the user ID.\n\nExample ➾ .stalk 100073291639820",
                            event.threadID
                        );
                    }
                    if (linkUid) {
                        userId = linkUid;
                        const user = await api.getUserInfo(userId);
                        userName = user[userId].name;
                    }
                } else {
                    userId = event.senderID;
                    const user = await api.getUserInfo(userId);
                    userName = user[userId].name;
                }
            }

            const response = await axios.get(`https://noobs-api.onrender.com/dipto/fbinfo?id=${userId}&key=dipto008`);
            const apiResponse = response.data;

            const formattedResponse = `
╠    𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞    ╣
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

• 𝗡𝗮𝗺𝗲: ${apiResponse.name}
...
• 𝗔𝗰𝗰𝗼𝘂𝗻𝘁 𝗖𝗿𝗲𝗮𝘁𝗶𝗼𝗻 𝗗𝗮𝘁𝗲: ${apiResponse.account_crt}
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
`;

            await api.sendMessage({
                body: formattedResponse,
                attachment: await global.utils.getStreamFromURL(apiResponse.photo)
            }, event.threadID);
        } catch (error) {
            console.error('Error fetching stalk data:', error);
            api.sendMessage("An error occurred while processing the request.", event.threadID);
        }
    }

};
