
function parseUri(request, sender, sendResponse) {
  var markup = document.documentElement.innerHTML;
  var startOfFileString = markup.search(/http\:\/\/.*\.mp4/g);
  var endOfFileString = markup.search(/\.mp4/) + 4;
  var fileUri = markup.slice(startOfFileString, endOfFileString);
  
  var result = {
    success: false,
    uri: null
  };
  
  if (fileUri.startsWith('http') && fileUri.endsWith('.mp4')) {
    result.success = true;
    result.uri = fileUri;
  }
  
  sendResponse({response: result});
}

browser.runtime.onMessage.addListener(parseUri);
