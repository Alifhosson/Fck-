/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "islam", 
  version: "1.0.0", 
  permission: 0,
  credits: "Nayan",
  description: "Random Islam video",
  prefix: true,
  category: "Media", 
  usages: "", 
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
  const randomUrls = [
    "https://drive.google.com/uc?id=1qkU11Pz0YM5YnkJUnqDj9l7o0Pk6LnO5",
    "https://drive.google.com/uc?id=1qspziP8dW7ksRvykkekZPZlFyLpGTeB5",
    // Add more video URLs as needed
  ];

  const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
  
  const downloadPath = "/cache/islam_video.mp4";
  
  const downloadVideo = async () => {
    const response = await axios.get(randomUrl, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(__dirname + downloadPath));
    response.data.on('end', () => sendMessage());
  };

  const sendMessage = () => {
    api.sendMessage({ body: "Random Islam video", attachment: fs.createReadStream(__dirname + downloadPath) }, event.threadID);
    fs.unlinkSync(__dirname + downloadPath);
  };

  downloadVideo();
};