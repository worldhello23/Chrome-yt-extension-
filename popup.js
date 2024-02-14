import { getActiveTab} from "./utils.js"


document.addEventListener("DOMContentLoaded", async() => {
    const activeTab = await getActiveTab();
    
    
    if (activeTab.url.includes("youtube.com/watch"))
    {
       console.log("this is youtube")
      
    }
    else {
        const container = document.getElementsByClassName("title")[0];
        container.innerHTML = '<div class = "title">This is not a youtube video page.</div>'; 
    }

    
});

