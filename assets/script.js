const synth = window.speechSynthesis;

const createBtn = document.getElementById('createBtn');
const voiceSelect = document.getElementById('model');
const rateElmnt = document.getElementById('rate');
const pitchElmnt  = document.getElementById('pitch');
let voices;

function populateVoiceList() {
  voices = synth.getVoices();
  let optgroups = {};

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name}`;
    option.value = voices[i].name;
    
    const lang = voices[i].lang;
    if (!optgroups[lang]) {
      optgroups[lang] = document.createElement("optgroup");
      optgroups[lang].label = lang;
    }
    optgroups[lang].appendChild(option);
  }

  for (const lang in optgroups) {
    voiceSelect.appendChild(optgroups[lang]);
  }
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

populateVoiceList();

createBtn.addEventListener('click', () => {
  let currentVoice = {};

  for (let i = 0; i < voices.length; i++) {
    if(voices[i].name === voiceSelect.value){
      currentVoice = voices[i];
    }
  }

  const objt = {
    'voiceName': {
      'default': currentVoice.default,
      'lang': currentVoice.lang,
      'localService': currentVoice.localService,
      'name': currentVoice.name,
      'voiceURI': currentVoice.voiceURI
    },
    'rate': rateElmnt.value,
    'pitch': pitchElmnt.value
  }


  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    // var message = [objt];
    // var message =[ "Hola, mundo!", objt]; // El valor que deseas pasar a content.js
  
    // Envía un mensaje a content.js
    chrome.tabs.sendMessage(activeTab.id, { data: objt });
  });

  window.close();
})