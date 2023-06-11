let settings, ResultStorage;
const selObj = window.getSelection();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  settings = request.data; // Obtiene el valor enviado desde script.js
});

const handleUtterance = (utteranceObject) => {
  const voices = window.speechSynthesis.getVoices();
  
  if(ResultStorage){
    utteranceObject = {
      lang: ResultStorage.model.data_lang,
      rate: ResultStorage.rate,
      pitch: ResultStorage.pitch,
      voice: voices.find(v => v.name === ResultStorage.model.data_name)
    }
  }
  else{ //default properties
    utteranceObject = {
      lang: 'en-GB',
      rate: 1.5,
      pitch: 1,
      voice: voices.find(voice => voice.name === 'Microsoft George - English (United Kingdom)')
    };
  }

  const utterance = new SpeechSynthesisUtterance();
  utterance.voice = utteranceObject.voice;
  utterance.lang = utteranceObject.lang;
  utterance.rate = utteranceObject.rate;
  utterance.pitch = utteranceObject.pitch;
  utterance.text = selObj.toString();

  return utterance;
}

//get properties
function chromeStorage(callback) {
  chrome.storage.sync.get(['model', 'rate', 'pitch'], result => callback(result));
}

const handleKeyDown = (e) => {
  if(selObj.toString === '') return;

  if(e.altKey){
    //solucion de mierda
    chromeStorage(result => ResultStorage = result);

    if(e.keyCode === 65){
      speechSynthesis.speak(handleUtterance(settings));
    }
    
    else if (e.keyCode === 83)
      speechSynthesis.cancel();
  }
};

// Las voces sintetizadas están listas, se ejecuta este código cuando están disponibles
window.speechSynthesis.onvoiceschanged = () => {
  document.addEventListener('keydown', handleKeyDown);
};