function doit () {
    const textareaElement = document.createElement("textarea");

    // listen for youtube page and if its updated
    chrome.runtime.onMessage.addListener((obj,sender,response) => {
        
        const { videoId } = obj;          
        currentVideo = videoId;
        
        newVideoLoaded();
            
    });


// // add search button and description box
const newVideoLoaded =  () => {
    textareaElement.textContent = '';
    const searchBtnExists = document.getElementsByClassName("search-btn")[0];
    const divElementExists = document.getElementsByClassName("div-element")[0];
    
    if (!searchBtnExists) {
        const searchBtn = document.createElement("img");
        searchBtn.src = chrome.runtime.getURL("images/search.png");
        searchBtn.className = "search-btn";
        searchBtn.title = "search button";
        searchBtn.style.width = "auto";
        searchBtn.style.height = "auto";
    
        youtubebar = document.evaluate("/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        childd = document.getElementById("secondary-inner");
        youtubebar.insertBefore(searchBtn, childd);

        //newBTN
        const newBtn = document.createElement("button");
        newBtn.textContent = "open chat gpt";
        newBtn.className = "new-btn";
        newBtn.style.marginLeft = "5px"; 
        
        youtubebar.insertBefore(newBtn, searchBtn.nextSibling);
        console.log("we are making a button");
        console.log(newBtn);
        console.log('this is new btn');
        newBtn.addEventListener("click", function() {
            // Send a message to the background script to open a new tab
            chrome.runtime.sendMessage({ openNewTab: "https://chat.openai.com" });
        });
        // summarize 
        const summ = document.createElement("button");
        summ.textContent = "summarize";
        summ.className = "new-btn";
        summ.style.marginLeft = "5px"; 
        youtubebar.insertBefore(summ, newBtn.nextSibling);
        summ.addEventListener("click", function() {
            // Send a message to the background script to open a new tab
            sendRequestToCloudFunction(textareaElement.textContent); 
        });

        };
        
    

    if(!divElementExists){
    const divElement = document.createElement("div");
    
    
    // Set textarea attributes
    textareaElement.setAttribute("rows", "15");
    textareaElement.setAttribute("cols", "50");
    textareaElement.setAttribute("readonly", true);
      
    // Add textarea to the div element
    divElement.appendChild(textareaElement);
    
    // Add class to the div element
    //divElement.innerHTML = 'Hello its me'; //'<textarea id="text-summary" rows="5" cols="40"></textarea>';
    divElement.className = "div-element";
    youtubebar.insertBefore(divElement, childd);

    }
    //more button
    waitForElementAndAct('tp-yt-paper-button#expand', (elm) => {
        // getTranscript(expandButton);
        elm.click()
        console.log("the element finally found");
    });

    // Show transcript button
    waitForElementAndAct('#primary-button ytd-button-renderer yt-button-shape button', (elm) => {
    elm.click();
    console.log('show transcript done')});


    //return the edited transcript
    text_f = waitForElementAndAct('#segments-container', (elm) => {
    textt = elm.textContent 
    textt = removenewlines(textt)
    if (textareaElement) {
        
        textareaElement.textContent = textt; // Update textarea content
    }

    //close transcript
    waitForElementAndAct('[aria-label="Close transcript"]', (elm) => {
        elm.click();
    })
    
    
    
    // } 
   });

}}; doit();

// Functions
// Remove new lines
const removenewlines = (textt) => {
    const pairs = textt.split(/\s+(?=\d+:)/).filter(Boolean); 
    const p = pairs.map(pair => pair.replace(/\n\s+/g, ' ').trim())
    return p;}
   
// Wait for Element to load on page
function waitForElementAndAct(selector, actionCallback) {

    const observer = new MutationObserver((mutations) => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            actionCallback(targetElement);
            observer.disconnect(); 
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
   
}
// Define a function to send a request to your Cloud Function
function sendRequestToCloudFunction(text_to_cloud) {
    // Define the URL of your Cloud Function
    const cloudFunctionUrl = 'https://us-central1-moonlit-haven-414211.cloudfunctions.net/function-smart';
    // Send a POST request to the Cloud Function
    fetch(cloudFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(text_to_cloud),
    })
    .then(response => response.text())
    .then(data => {
      console.log('Response from Cloud Function:', data);
      // Handle the response from the Cloud Function as needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Call the function when needed (e.g., when a button is clicked)

  




