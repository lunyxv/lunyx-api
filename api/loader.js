const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).send('Missing ID');
    }
    
    const data = await kv.get(`loader:${id}`);
    
    if (!data) {
        return res.status(404).send('Loader not found');
    }
    
    const loaderCode = generateLoaderCode(id, data.scriptId);
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(loaderCode);
};

function generateLoaderCode(loaderId, scriptId) {
    const folder = Math.random().toString(16).substring(2, 18);
    const cacheFile = `init-${Math.random().toString(16).substring(2, 18)}.lua`;
    
    return `-- Do not save this file
-- Always use the loadstring
local function _load()
    local folder = "${folder}"
    local cacheFile = "${cacheFile}"
    local scriptId = "${scriptId}"
    
    local cached
    pcall(function()
        cached = readfile(folder .. "/" .. cacheFile)
    end)
    
    if cached and #cached > 50 then
        return loadstring(cached)
    end
    
    local success, result = pcall(function()
        return game:HttpGet("https://lunyx-api.vercel.app/api/load?id=" .. scriptId)
    end)
    
    if success and result then
        pcall(function()
            makefolder(folder)
            writefile(folder .. "/" .. cacheFile, result)
        end)
        
        pcall(function()
            for _, file in pairs(listfiles("./" .. folder)) do
                local name = file:match("(init[%w%-]*).lua$")
                if name and name ~= cacheFile then
                    pcall(delfile, folder .. "/" .. name .. ".lua")
                end
            end
        end)
        
        return loadstring(result)
    end
    
    return nil
end

local loader = _load()
if loader then
    loader()
else
    warn("Failed to load script")
end`;
}
