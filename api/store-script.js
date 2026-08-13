const { kv } = require('@vercel/kv');
const crypto = require('crypto');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { script, name } = req.body;
    
    if (!script) {
        return res.status(400).json({ error: 'Missing script' });
    }
    
    const scriptId = crypto.randomBytes(16).toString('hex');
    
    await kv.set(`script:${scriptId}`, {
        script,
        name: name || null,
        timestamp: Date.now(),
        loads: 0
    });
    
    res.status(200).json({ 
        id: scriptId,
        url: `https://lunyx-api.vercel.app/api/load?id=${scriptId}`
    });
};
