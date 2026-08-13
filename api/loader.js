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
    
    const loaderCode = generateLoader(data.scriptId);
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(loaderCode);
};

function generateLoader(scriptId) {
    const f = Math.random().toString(16).substring(2, 12);
    const b = Math.random().toString(16).substring(2, 14);
    
    const chars = [];
    for (let i = 0; i < scriptId.length; i++) {
        chars.push(scriptId.charCodeAt(i));
    }
    
    return `-- Do not save this file
-- Always use the loadstring
local f,b,a="${f}","${b}",nil;local d={${chars.join(',')}};local s="";for i=1,#d do s=s..string.char(d[i])end;pcall(function()a=readfile(f.."/init-"..b..".lua")end) if a and #a>2000 then a=loadstring(a) else a=nil; end;
if a then return a() else pcall(makefolder,f) a=game:HttpGet("https://lunyx-api.vercel.app/api/load?id="..s) writefile(f.."/init-"..b..".lua", a);
pcall(function() for i,v in pairs(listfiles('./'..f)) do local m=v:match('(init[%w%-]*).lua$') if m and m~=('init-'..b) then pcall(delfile, f..'/'..m..'.lua') end end; end); return loadstring(a)() end`;
}
