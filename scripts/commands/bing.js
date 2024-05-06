const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "bing",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "",
    prefix: 'awto',
    category: "auto prefix",
    usages: "bing prompt",
    cooldowns: 10,
  },
  async fetchSVG() {
    try {
      const response = await axios.get('https://www.bing.com/rp/zYRmeqAEd4Z0yDRz8nuL0syHMEI.svg');
      const svgData = response.data;
      fs.writeFileSync('image.svg', svgData);
      console.log('SVG image downloaded successfully as image.svg');
    } catch (error) {
      console.error('Error fetching SVG:', error);
    }
  }
};

module.exports.fetchSVG(); // Call the fetchSVG function after defining it
