const crypto = require('crypto');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const uniqueId = crypto.randomBytes(16).toString('hex');
    
    res.status(200).json({ 
        id: uniqueId,
        timestamp: Date.now()
    });
};