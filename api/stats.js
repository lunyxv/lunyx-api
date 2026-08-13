const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    try {
        const scriptKeys = await kv.keys('script:*');
        const loaderKeys = await kv.keys('loader:*');
        const obfuscationKeys = await kv.keys('obfuscation:*');
        
        let totalLoads = 0;
        
        for (const key of scriptKeys) {
            const data = await kv.get(key);
            totalLoads += data?.loads || 0;
        }
        
        res.status(200).json({
            totalScripts: scriptKeys.length,
            totalLoaders: loaderKeys.length,
            totalObfuscations: obfuscationKeys.length,
            totalLoads
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(200).json({
            totalScripts: 0,
            totalLoaders: 0,
            totalObfuscations: 0,
            totalLoads: 0
        });
    }
};
