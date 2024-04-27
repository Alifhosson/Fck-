const axios = require('axios');

module.exports.config = {
    name: "dl",
    version: "1.0.0",
    permission: 2,
    credits: "Rahad",
    description: "Convert media from a Google Drive link",
    prefix: true, 
    category: "Media", 
    usages: "/Convert [link]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
    const url = args[0];

    if (!url) {
        return api.sendMessage('Please provide a valid Google Drive link to convert media from.', event.threadID, event.messageID);
    }
    
    
    const waitMessage = await api.sendMessage('Creating download link. Please wait...', event.threadID);

    try {
        const fileId = url.match(/\/d\/([^/]+)/)[1];
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        const response = await axios.head(downloadUrl, { maxRedirects: 5 });

        if (response.status !== 200) {
            await api.sendMessage('Failed to fetch the media from the provided link.', event.threadID, event.messageID);
            
            await api.unsendMessage(waitMessage.messageID);
            return;
        }

        const finalUrl = response.request.res.responseUrl;
        
        const { data: fileStream } = await axios.get(finalUrl, { responseType: 'stream' });

        api.sendMessage(
            {
                body: `✅ Download Link: ${finalUrl}`,
                attachment: fileStream,
            },
            event.threadID, null, event.messageID,
        );

        
        setTimeout(async () => {
            await api.unsendMessage(waitMessage.messageID);
        }, 5000);
    } catch (error) {
        api.sendMessage('An error occurred while converting the media.', event.threadID, event.messageID);
        console.error(error);
    
        await api.unsendMessage(waitMessage.messageID);
    }
};
