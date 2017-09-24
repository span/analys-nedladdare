function onGot(tabInfo) {
  console.log(tabInfo);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGot, onError);

var button = document.getElementById("download-btn"); button.addEventListener("click", function() {
    
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
     gettingActiveTab.then((tabs) => { 
         var sending = browser.tabs.sendMessage(tabs[0].id, {}); 
         sending.then(handleResponse, handleError);
     });

     function handleResponse(message) {
         if (message.response.success) {
             download(message.response.uri, 'analys.mp4');
         } else {
             alert('Det gick inte att hitta någon videofil på sidan. Öppna den sida som innehåller din analys och försök igen.');
         }
     }
     
     function handleError(error) {
         console.log(`Error: ${error}`);
     }

     function download(uri, filename) {
         var downloading = browser.downloads.download({ url: uri, filename: filename, conflictAction: 'uniquify' });
         downloading.then(onStartedDownload, onFailed); 
         
         function onStartedDownload(id) {
             window.close();
         }
         
         function onFailed(error) {
             console.log(`Download failed: ${error}`);
         }
     }
     
     return false;
});
