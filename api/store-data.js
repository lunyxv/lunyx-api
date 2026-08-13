const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { id, keys, metadata } = req.body;
    
    if (!id || !keys) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        await kv.set(`obfuscation:${id}`, {
            id,
            keys,
            metadata,
            timestamp: Date.now()
        });
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Failed to store data' });
    }
};
