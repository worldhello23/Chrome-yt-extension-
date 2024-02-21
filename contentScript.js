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

     if (!searchBtnExists) {
         //search btn
        const searchBtn = document.createElement("img");
        searchBtn.src = chrome.runtime.getURL("images/search.png");
        searchBtn.className = "search-btn";
        searchBtn.title = "search button";
        searchBtn.style.width = "auto";
        searchBtn.style.height = "auto";
    
        
        childd = document.querySelector("#secondary-inner");
        youtubebar = childd.parentNode;
        youtubebar.insertBefore(searchBtn, childd);

        //newBTN
        const newBtn = document.createElement("button");
        newBtn.textContent = "open chat gpt";
        newBtn.className = "new-btn";
        newBtn.style.marginLeft = "5px"; 
        
        // youtubebar.appendChild(newBtn);
        youtubebar.insertBefore(newBtn, childd);//searchBtn.nextSibling);
        console.log("we are making a button");
        console.log(newBtn);
        console.log('this is new btn');
        // open chatgpt on click newbtn
        newBtn.addEventListener("click", function() {
            // Send a message to the background script to open a new tab
            chrome.runtime.sendMessage({ openNewTab: "https://chat.openai.com" });
        });
        // summarize 
        const summ = document.createElement("button");
        summ.textContent = "summarize";
        summ.className = "summ";
        summ.style.marginLeft = "5px"; 
        youtubebar.insertBefore(summ, childd);
        summ.addEventListener("click", function() {
            // Send a message to the background script to open a new tab
            prompt_text  = "Summarize the following transcript as if to a final user of a summary service. Be cohesive but also direct. Here it is :" + text_cleaned;
            
            sendRequestToCloudFunction(prompt_text)
    .then(data => {
        // Set the response from the Cloud Function as the content of the textarea
        textareaElement.textContent = data;
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error.message);
        // Optionally, display an error message to the user
        textareaElement.textContent = 'An error occurred while fetching data from the server.';
    });

        });
        //semantic search button
        const sem_search = document.createElement("button");
        sem_search.textContent = "semantic search";
        sem_search.className = "sem-search";
        sem_search.marginLeft = "5px"; 
        // youtubebar.insertBefore(sem_search, summ.nextSibling);
        
        const divElement = document.createElement("div");
    
    
    // Set textarea attributes
        textareaElement.setAttribute("rows", "15");
        textareaElement.style.width = "calc(100% - 10px)";
        
        textareaElement.setAttribute("readonly", true);
      
    // Add textarea to the div element
        divElement.appendChild(textareaElement);
    
    // Add class to the div element
    //divElement.innerHTML = 'Hello its me'; //'<textarea id="text-summary" rows="5" cols="40"></textarea>';
        divElement.className = "div-element";
        youtubebar.insertBefore(divElement, childd);

        // Create the search bar input element
        const searchBar = document.createElement("input");
        searchBar.type = "text";
        searchBar.placeholder = "Enter your search query";
        // You can adjust the style as needed
        searchBar.style.width = "calc(100% - 10px)";
        // youtubebar.insertBefore(searchBar, divElement);
        // Append the search bar to the YouTube bar
            
    
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
    console.log('show transcript done')
    //return the edited transcript
    });
    waitForElementAndAct('#segments-container', (elm) => {
    textt = elm.textContent;
    console.log(textt);
    text_cleaned = removenewlines(textt);
    console.log(text_cleaned)
    
    // })

    //close transcript
    waitForElementAndAct('[aria-label="Close transcript"]', (elm) => {
        elm.click();
        console.log('close ' + elm);
        
    }); });
    
    
    
    // } 
   }};

doit();

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
    const cloudFunctionUrl = 'https://us-central1-moonlit-haven-414211.cloudfunctions.net/function-chrome-extension/generateText/';
  
    // Send a POST request to the Cloud Function and return the promise
    return fetch(cloudFunctionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text_to_cloud }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Return the response text
    })
    .then(data => {
        
        return data; // Return the response te
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught by the caller
    });
}

