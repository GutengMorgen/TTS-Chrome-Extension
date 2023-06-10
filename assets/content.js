let settings;
const selObj = window.getSelection();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  settings = request.data; // Obtiene el valor enviado desde popup.js
});


function handleUtterance(settingObjt, currentVoice) {
  const utterance = new SpeechSynthesisUtterance();

  if(settingObjt){
    utterance.voice = currentVoice;
    utterance.rate = settingObjt.rate;
    utterance.pitch = settingObjt.pitch;
    utterance.text = selObj.toString();
    return utterance;
  }

  else{
    utterance.lang = 'en-US';
    utterance.rate = 2.5;
    utterance.pitch = 1;
    utterance.text = selObj.toString();
    return utterance;
  }
}


const handleKeyDown = (e) => {
  const voices = window.speechSynthesis.getVoices();
  let currentVoice;

  if(settings){
    currentVoice = voices.find(voice => voice.name === settings.voiceName);
  }

  if(e.altKey){
    if(e.keyCode === 65)
      speechSynthesis.speak(handleUtterance(settings, currentVoice))
    else if (e.keyCode === 83)
      speechSynthesis.cancel();
  }
};

// Las voces sintetizadas están listas, se ejecuta este código cuando están disponibles
window.speechSynthesis.onvoiceschanged = () => {
  document.addEventListener('keydown', handleKeyDown);
};