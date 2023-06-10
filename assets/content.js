let settings;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  settings = request.data; // Obtiene el valor enviado desde popup.js
  console.log(settings.voiceName); // Haz lo que necesites con el valor recibido
});

const selObj = window.getSelection();

function handleSpeak(settingObjt) {
  const utterance = new SpeechSynthesisUtterance();

  if(settingObjt){


    utterance.voiceURI = settingObjt.voiceName.voiceURI;
    utterance.name = settingObjt.voiceName.name;
    utterance.lang = settingObjt.voiceName.lang;
    utterance.localService = settingObjt.voiceName.localService;

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
  
    return utterance;
  }
}