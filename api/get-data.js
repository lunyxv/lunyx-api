const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).json({ error: 'Missing ID' });
    }
    
    try {
        const data = await kv.get(`obfuscation:${id}`);
        
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
