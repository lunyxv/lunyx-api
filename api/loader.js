const { kv } = require('@vercel/kv');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string' || id.length > 256) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    
    try {
        const data = await kv.get(`loader:${id}`);
        
        if (!data || !data.scriptId) {
            return res.status(404).json({ error: 'Loader not found' });
        }
        
        if (typeof data.scriptId !== 'string') {
            return res.status(500).json({ error: 'Invalid script data' });
        }
        
        const loaderCode = generateLoader(data.scriptId, id);
        
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.send(loaderCode);
    } catch (err) {
        console.error('Loader error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

function generateLoader(scriptId, loaderId) {
    // Generate strong random values
    const folderName = crypto.randomBytes(8).toString('hex');
    const fileName = crypto.randomBytes(8).toString('hex');
    const salt = crypto.randomBytes(16).toString('hex');
    
    // Derive key from scriptId + salt using PBKDF2
    const key = crypto.pbkdf2Sync(scriptId, salt, 100000, 32, 'sha256').toString('hex');
    
    // AES-256-GCM encryption for scriptId
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
    
    let encrypted = cipher.update(scriptId, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    // HMAC signature for integrity
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(encrypted + authTag + loaderId);
    const signature = hmac.digest('hex');
    
    // Anti-decompile: split strings, use string.format, obfuscate variable names
    const obfuscatedCode = `
local _W=string.char local _X=string.sub local _Y=string.format local _Z=table.concat
local __a=tostring local __b=tonumber local __c=#
local _path=_Y(_W(102,111,108,100,101,114),_W(47))
local _file=_Y(_W(102,105,108,101),_W(47))
local _salt="${salt}"
local _iv="${iv.toString('hex')}"
local _enc="${encrypted}"
local _tag="${authTag}"
local _sig="${signature}"
local _lid="${loaderId}"
local _key_str="${key}"

local function _decrypt()
    local _check=game:HttpGet(_Y(_W(104,116,116,112,115,58,47,47),_W(97,112,105),_W(46),_W(101,120,116),_W(46),_W(99,111,109,47,118,101,114,105,102,121)),{Headers={[_W(88,45,76,111,97,100,101,114)]=_sig}})
    if _check~="ok" then return nil end
    return _enc
end

local function _cache_path()
    return _Y(_W(46,47),_Y(_W(37,120),_W(115)),_W(47,105,110,105,116),_W(45),_W(37,115),_W(46,108,117,97)):format("${folderName}","${fileName}")
end

local _cached=nil
pcall(function()
    _cached=readfile(_cache_path())
    if _cached and __c(_cached)>1000 then
        return loadstring(_cached)()
    end
end)

if _cached then return _cached end

local _script_data=_decrypt()
if not _script_data then error(_W(70,97,105,108,101,100,32,116,111,32,100,101,99,114,121,112,116)) end

pcall(makefolder,"${folderName}")
pcall(function()
    for _,_v in pairs(listfiles(_Y(_W(46,47),_Y(_W(37,120),_W(115)))):format("${folderName}")) do
        local _match=_v:match(_Y(_W(105,110,105,116),_W(91),_W(37,119,45),_W(93,42),_W(46,108,117,97)))
        if _match and _match~=_Y(_W(105,110,105,116),_W(45),_W(37,115)):format("${fileName}") then
            pcall(delfile,_v)
        end
    end
end)

writefile(_cache_path(),_script_data)
return loadstring(_script_data)()
`.trim();
    
    return `-- Do not save this file\n-- Runtime loader v2\n${obfuscatedCode}`;
}
