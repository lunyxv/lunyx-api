const { kv } = require('@vercel/kv');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.status(400).send('Missing ID');
    }
    
    const data = await kv.get(`loader:${id}`);
    
    if (!data) {
        return res.status(404).send('Loader not found');
    }
    
    const loaderCode = generateLoader(data.scriptId, id);
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-store');
    res.send(loaderCode);
};

function generateLoader(scriptId, loaderId) {
    const f = crypto.randomBytes(6).toString('hex');
    const b = crypto.randomBytes(6).toString('hex');
    
    const key = crypto.createHash('sha256')
        .update(scriptId + loaderId)
        .digest('hex')
        .slice(0, 32);
    
    const encrypted = [];
    for (let i = 0; i < scriptId.length; i++) {
        encrypted.push(scriptId.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    
    const chunkSize = Math.ceil(encrypted.length / 3);
    const chunks = [
        encrypted.slice(0, chunkSize),
        encrypted.slice(chunkSize, chunkSize * 2),
        encrypted.slice(chunkSize * 2)
    ];
    
    chunks.reverse();
    
    return `-- Do not save this file
-- Always use the loadstring
pcall(function()print(game:HttpGet("https://lunyx-api.vercel.app/api/ascii"))end);
local f,b,a="${f}","${b}",nil;local k="${key}";local c1={${chunks[0].join(',')}};local c2={${chunks[1].join(',')}};local c3={${chunks[2].join(',')}};local d={};for i=1,#c3 do d[i]=c3[i]end;for i=1,#c2 do d[#c3+i]=c2[i]end;for i=1,#c1 do d[#c3+#c2+i]=c1[i]end;local s="";for i=1,#d do s=s..string.char(bit32.bxor(d[i],string.byte(k,((i-1)%#k)+1)))end;pcall(function()a=readfile(f.."/init-"..b..".lua")end) if a and #a>2000 then a=loadstring(a) else a=nil; end;
if a then return a() else pcall(makefolder,f) a=game:HttpGet("https://lunyx-api.vercel.app/api/load?id="..s) writefile(f.."/init-"..b..".lua", a);
pcall(function() for i,v in pairs(listfiles('./'..f)) do local m=v:match('(init[%w%-]*).lua$') if m and m~=('init-'..b) then pcall(delfile, f..'/'..m..'.lua') end end; end); return loadstring(a)() end`;
}
