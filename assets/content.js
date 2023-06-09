let settings;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  settings = request.data; // Obtiene el valor enviado desde popup.js
  console.log(settings.voiceName); // Haz lo que necesites con el valor recibido
});

const selObj = window.getSelection();

function handleSpeak(settingObjt) {
  const utterance = new SpeechSynthesisUtterance();

  if(settingObjt){


    // Asignar la primera voz disponible a utterance.voice
    utterance.voiceURI = settingObjt.voiceName.voiceURI;
    utterance.name = settingObjt.voiceName.name;
    utterance.lang = settingObjt.voiceName.lang;
    utterance.localService = settingObjt.voiceName.localService;

    // console.log(window.speechSynthesis.getVoices(), settingObjt.voiceName);
    utterance.rate = settingObjt.rate;
    utterance.pitch = settingObjt.pitch;
    utterance.text = selObj.toString();
  
    return utterance;
  }

  else{

    utterance.lang = 'en-En';
    utterance.rate = 2.5;
    utterance.pitch = 0;
    utterance.text = selObj.toString();
    // console.log(utterance);
  
    return utterance;
  }
}


const handleKeyDown = (e) => {
  if(selObj.toString() === '') return;
  // console.log(settings);
  // console.log(e);
  if(e.altKey && e.keyCode === 83){
    speechSynthesis.speak(handleSpeak(settings));
  }
};


document.addEventListener('keydown', handleKeyDown);