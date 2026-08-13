module.exports = async (req, res) => {
    const ascii = `
                                                  
                                                  
                                                  
 ##                                               
 ##                                               
 ##                                               
 ##        ##    ##  ##.####   ##    ##  ###  ### 
 ##        ##    ##  #######   :##  ##    ##::##  
 ##        ##    ##  ###  :##   ##: ##.   :####:  
 ##        ##    ##  ##    ##   ###:##     ####   
 ##        ##    ##  ##    ##   .## #      :##:   
 ##        ##    ##  ##    ##    ####.     ####   
 ##        ##:  ###  ##    ##    :###     :####:  
 ########   #######  ##    ##     ##      ##::##  
 ########    ###.##  ##    ##     ##.    ###  ### 
                                 :##              
                                ###:              
                                ###               

This script was protected using Lunyx
Obfuscator v0.0.5 [https://discord.gg/vKtwdAsDTP]
  
`;
    
    res.setHeader('Content-Type', 'text/plain');
    res.send(ascii);
};
