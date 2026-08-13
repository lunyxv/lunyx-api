module.exports = async (req, res) => {
    res.status(200).json({
        endpoints: [
            { method: 'POST', path: '/api/generate-id', description: 'Generate a unique ID' },
            { method: 'POST', path: '/api/store-data', description: 'Store obfuscation data' },
            { method: 'GET', path: '/api/get-data', description: 'Get obfuscation data by ID' },
            { method: 'GET', path: '/api/get-key', description: 'Get encryption key by ID' },
            { method: 'POST', path: '/api/store-script', description: 'Store a script' },
            { method: 'GET', path: '/api/load', description: 'Load a script by ID' },
            { method: 'POST', path: '/api/create-loader', description: 'Create a loader' },
            { method: 'GET', path: '/api/loader', description: 'Get loader code by ID' },
            { method: 'GET', path: '/api/ascii', description: 'Get ASCII art' },
            { method: 'GET', path: '/api/stats', description: 'Get statistics' },
            { method: 'GET', path: '/api/verify', description: 'Verify a script exists' },
            { method: 'POST', path: '/api/delete-loader', description: 'Delete a loader' }
        ]
    });
};
