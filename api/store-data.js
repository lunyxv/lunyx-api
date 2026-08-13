const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { id, keys, metadata } = req.body;
    
    if (!id || !keys) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, `${id}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify({
        id,
        keys,
        metadata,
        timestamp: Date.now()
    }, null, 2));
    
    res.status(200).json({ success: true });
};