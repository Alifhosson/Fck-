const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');

async function getAvatarUrls(userIDs) {
    let avatarURLs = [];
    try {
        for (let userID of userIDs) {
            let url = `https://graph.facebook.com/${userID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
            avatarURLs.push(url);
        }
    } catch (error) {
        avatarURLs.push("https://i.imgur.com/EBK57TQ.png");
    }
    return avatarURLs;
}

module.exports.config = {
    name: "gcimg",
    version: "1.0",
    permission: 1,
    credits: "Alif",
    description: "Get Group Image",
    prefix: true,
    category: "IMAGE",
    usages: "{pn} [TID/leave blank] --color [color] --bgcolor [bgcolor] --admincolor [admincolor] --membercolor [membercolor]",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function({ api, args, event }) {
    try {
        let color = "red";
        let bgColor = "";
        let adminColor = "";
        let memberColor = "";

        for (let i = 0; i < args.length; i++) {
            switch (args[i]) {
                case "--bgcolor":
                    bgColor = args[i + 1];
                    i++;
                    break;
                case "--admincolor":
                    adminColor = args[i + 1];
                    i++;
                    break;
                case "--membercolor":
                    memberColor = args[i + 1];
                    i++;
                    break;
                case "--color":
                    color = args[i + 1];
                    i++;
                    break;
            }
        }

        let tid = event.threadID;
        let threadInfo = await api.getThreadInfo(tid);
        let participantIDs = threadInfo.participantIDs;
        let adminIDs = threadInfo.adminIDs.map(admin => admin.id);
        let memberURLs = await getAvatarUrls(participantIDs);
        let adminURLs = await getAvatarUrls(adminIDs);

        const data2 = {
            memberURLs: memberURLs,
            groupPhotoURL: threadInfo.imageSrc,
            adminURLs: adminURLs,
            groupName: threadInfo.threadName,
            bgcolor: bgColor,
            admincolor: adminColor,
            membercolor: memberColor,
            color: color
        };

        api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
        const { data } = await axios.post('https://noobs-api.onrender.com/dipto/groupPhoto', data2);
        const filePath = path.join(__dirname, "cache", "gcimg.png");
        const imgRes = await axios.get(data.img, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, Buffer.from(imgRes.data, 'binary'));
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        api.sendMessage({
            body: `Here is your group image <😘`,
            attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    } catch (error) {
        console.log(error);
        api.sendMessage('Error: ' + error.message, event.threadID, event.messageID);
    }
};
