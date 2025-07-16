const grabBtn = document.getElementById('grabBtn');

grabBtn.addEventListener('click',() => {
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        
        // Check if tab exists
        if (tab) {
            grabImages();
        } else {
            alert('no tabs dawg');
        }
    })
})


function grabImages() {
    chrome.scripting.executeScript(
        {
            target:{tabID: tab.id, allFrames: true},
            func: yoink,
        },
        onResult
    )

    function yoink() {
        const images = document.querySelectorAll("img");
        return Array.from(images).map(image => image.src);
    }
}

/**
 * Callback function executed after all grabImages() 
 * calls finished on remote page
 * Combines results and copy a list of image URLs 
 * to clipboard
 * 
 * @param {[]InjectionResult} frames Array of grabImage() 
 * function execution results
 */
function onResult() {
    // If script execution failed on the remote end 
    // and could not return results
    if (!frames || !frames.length) { 
        alert("no imgs dawg");
        return;
    }
}