module.exports.config = {
    name: "status2",
    version: "1.0.0",
    permission: 0,
    credits: "Rahad",
    description: "Status video",
    prefix: true, 
    category: "Video", 
    usages: "status2",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios")
    const request = require("request")
    const fs = require("fs-extra")
    const res = await axios.get(`http://nl2-4.deploy.sbs:2016/auto`);
    var data = res.data.data;
    var msg = [];
    let img1 = `${res.data.url.url}`;
    let cp = `${res.data.url.title}`
    let rahad = `${res.data.author}`

    let imgs1 = (await axios.get(`${img1}`, {
        responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(__dirname + "/cache/img1.mp4", Buffer.from(imgs1, "utf-8"));
    var allimage = [];
    allimage.push(fs.createReadStream(__dirname + "/cache/img1.mp4"));

    {
        msg += `°\n\n__${cp}\n\n✨🌺${rahad}..!🍂`

    }

    return api.sendMessage({
        body: msg,
        attachment: allimage
    }, event.threadID, event.messageID);
      }
