chrome.tabs.onUpdated.addListener((tabId,changeinfo,tab) => {
    console.log(tab.url)
    console.log(changeinfo)
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        
       
        chrome.tabs.sendMessage(tabId, {
            
            videoId :urlParameters.get("v")
         
  
        })  
    }});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.openNewTab) {
        // Open the desired URL in a new tab
        chrome.tabs.create({ url: message.openNewTab });
    }
});
   // Background script

//    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'fetchData') {
//         // Perform data fetching or any other action
//         fetchDataFromServer()
//             .then((data) => {
//                 sendResponse({ success: true, data });
//             })
//             .catch((error) => {
//                 sendResponse({ success: false, error: error.message });
//             });

//         // Return true to indicate that sendResponse will be called asynchronously
//         return true;
//     }
// });



    
   



  