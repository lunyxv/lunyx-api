const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).json({ error: 'Missing ID' });
    }
    
    const filePath = path.join(process.cwd(), 'data', `${id}.json`);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Data not found' });
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    res.status(200).json({ key: data.keys.xorKey });
};
