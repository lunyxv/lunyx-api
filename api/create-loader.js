const { kv } = require('@vercel/kv');
const crypto = require('crypto');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { scriptId } = req.body;
    
    if (!scriptId) {
        return res.status(400).json({ error: 'Missing scriptId' });
    }
    
    const loaderId = crypto.randomBytes(16).toString('hex');
    
    await kv.set(`loader:${loaderId}`, {
        scriptId,
        timestamp: Date.now(),
        loads: 0
    });
    
    res.status(200).json({ 
        loaderId,
        url: `https://lunyx-api.vercel.app/api/loader?id=${loaderId}`
    });
};
