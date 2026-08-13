const { kv } = require('@vercel/kv');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).send('Missing ID');
    const data = await kv.get(`loader:${id}`);
    if (!data) return res.status(404).send('Not found');
    const key = crypto.createHash('sha256').update(data.scriptId + id).digest('hex').slice(0, 32);
    const encrypted = Buffer.from(data.scriptId).toString('base64');
    const hmac = crypto.createHmac('sha256', key).update(encrypted).digest('hex');
    res.setHeader('Content-Type', 'text/plain');
    res.send(`local k="${key}";local e="${encrypted}";local h="${hmac}";if crypto.createHmac('sha256',k):update(e):digest('hex')~=h then error('tampered')end;return loadstring(require('base64').decode(e))()`);
};
