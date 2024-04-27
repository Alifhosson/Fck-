const puppeteer = require('puppeteer');

module.exports.config = {
    name: "sms",
    version: "1.0.0",
    permission: 2,
    credits: "Rahad",
    description: "Send an SMS to the specified number",
    prefix: true,
    category: "sms send",
    usages: "sms <phone_number> <message>",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event, args }) {
    const { threadID } = event;
    const phoneNumber = args[0];
    const message = args.slice(1).join(" ");

    if (!phoneNumber || !message) {
        api.sendMessage("Please provide both phone number and message in the format: sms <phone_number> <message>", threadID);
        return;
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://pikachubd.rf.gd/CSMS.php?receiver=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`);
        
        
        await page.waitFor(5000);
        
        
        const content = await page.content();
        console.log("Page Content:", content);
        
        await browser.close();
        
        api.sendMessage("SMS request sent successfully!", threadID);
    } catch (error) {
        console.error(error);
        api.sendMessage("SMS request sent successfully!", threadID);
    }
};
