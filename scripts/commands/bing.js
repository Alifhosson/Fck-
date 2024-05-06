const axios = require('axios');

async function fetchSVG() {
    try {
        const response = await axios.get('https://www.bing.com/rp/zYRmeqAEd4Z0yDRz8nuL0syHMEI.svg', {
            headers: {
                'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
                'sec-ch-ua-mobile': '?1',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                'sec-ch-ua-arch': '""',
                'sec-ch-ua-full-version': '"124.0.6327.4"',
                'sec-ch-ua-platform-version': '"11.0.0"',
                'Referer': 'https://www.bing.com/images/create/a-cat/1-6639270196e1418d9ba5a8961bf7f570?FORM=GENCRE',
                'sec-ch-ua-full-version-list': '"Not-A.Brand";v="99.0.0.0", "Chromium";v="124.0.6327.4"',
                'sec-ch-ua-bitness': '""',
                'sec-ch-ua-model': '"Infinix X6816C"',
                'sec-ch-ua-platform': '"Android"'
            }
        });
        
        return response.data; // Return the SVG data
    } catch (error) {
        console.error('Error fetching SVG:', error);
        throw error; // Throw the error for handling in the calling code
    }
}

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
    languages: {
        "vi": {},
        "en": {
            "missing": 'use : /bing cat'
        }
    },
    fetchSVG: fetchSVG
};
