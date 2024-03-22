    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage 
           || window.navigator.userLanguage;

    let shortLang = lang;
    if (shortLang.indexOf('-') !== -1)
        shortLang = shortLang.split('-')[0];

    if (shortLang.indexOf('_') !== -1)
        shortLang = shortLang.split('_')[0];

//    if(shortLang === 'af')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'am')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'ar')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'ar-eg')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'az')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'be')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'bg')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'bn')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'ca')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'cs')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'cy')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'da')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
                                        
//   if(shortLang === 'de')
//        window.location.replace('/lang/' + shortLang + url.pathname);
        
//    if(shortLang === 'el')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'es')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'et')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'eu')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'fa')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ff')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
         
//    if(shortLang === 'fi')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'fr')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
         
//    if(shortLang === 'fr-ca')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ga')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
         
//    if(shortLang === 'gd')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'gl')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ha')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'he')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'hi')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'hr')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'ht')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'hu')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'hy')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'id')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ig')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'is')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'it')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'iu')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'ja')
//        window.location.replace('/lang/' + shortLang + '/index.html');     

//    if(shortLang === 'jv')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'kk')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'km')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'kn')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'ko')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'ku')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'la')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'lb')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'lo')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'lt')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'lv')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'mi')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'mk')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'mn')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ms')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'mt')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'my')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'ne')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'nl')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'no')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'nv')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'om')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'pa-in')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'pa-pk')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'pl')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'pt')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'pt-br')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ps')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'qu')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ro')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ru')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'sa')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'sd')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'sk')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'sl')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'sm')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'so')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'sq')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'sr')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'su')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'sv')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'sw')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'ta')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'te')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'tg')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'th')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'tl')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'tr')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'uk')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'ur')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'uz')
//        window.location.replace('/lang/' + shortLang + '/index.html');

//    if(shortLang === 'vi')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 

//    if(shortLang === 'yi')
//        window.location.replace('/lang/' + shortLang + '/index.html');
        
//    if(shortLang === 'yo')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'zh-cn')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'zh-hk')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'zh-sg')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'zh-tw')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 
        
//    if(shortLang === 'zu')
//        window.location.replace('/lang/' + shortLang + '/index.html'); 