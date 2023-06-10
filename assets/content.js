let settings;
const selObj = window.getSelection();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  settings = request.data; // Obtiene el valor enviado desde popup.js
});

const handleUtterance = (settingObjt) => {
  const voices = window.speechSynthesis.getVoices();
  
  if(!settingObjt){
    settingObjt = {
      lang: 'en-GB',
      rate: 1.5,
      pitch: 1,
      voice: voices.find(voice => voice.name === 'Microsoft George - English (United Kingdom)')
    };
  }
  else{
    settingObjt.voice = voices.find(voice => voice.name === settingObjt.voiceName);
  }
  

  const utterance = new SpeechSynthesisUtterance();
  utterance.voice = settingObjt.voice;
  utterance.lang = settingObjt.lang;
  utterance.rate = settingObjt.rate;
  utterance.pitch = settingObjt.pitch;
  utterance.text = selObj.toString();

  return utterance;
}


const handleKeyDown = (e) => {
  if(selObj.toString === '') return;

  if(e.altKey){
    if(e.keyCode === 65)
      speechSynthesis.speak(handleUtterance(settings))
    else if (e.keyCode === 83)
      speechSynthesis.cancel();
  }
};

// Las voces sintetizadas están listas, se ejecuta este código cuando están disponibles
window.speechSynthesis.onvoiceschanged = () => {
  document.addEventListener('keydown', handleKeyDown);
};