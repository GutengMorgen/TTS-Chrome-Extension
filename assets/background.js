// localStorage.setItem('objt', 20000);


function createContextMenu(){
    chrome.contextMenus.removeAll(function(){});
    chrome.contextMenus.create({
        "id": "myContextMenu",
        'type':'normal',
        'title':'Readme - Text to Speech',
        'contexts':['selection']
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createContextMenu();
});