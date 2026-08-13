const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).send('Missing ID');
    }
    
    const data = await kv.get(`script:${id}`);
    
    if (!data) {
        return res.status(404).send('Script not found');
    }
    
    await kv.set(`script:${id}`, {
        ...data,
        loads: (data.loads || 0) + 1
    });
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(data.script);
};
