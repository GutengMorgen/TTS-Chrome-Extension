const createBtn = document.getElementById('createBtn');
const voiceSelect = document.getElementById('model');
const rateElmnt = document.getElementById('rate');
const pitchElmnt  = document.getElementById('pitch');

let voices;
const synth = window.speechSynthesis;

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

    chrome.tabs.sendMessage(activeTab.id, { data: objt });
  });

  window.close();
})

chrome.storage.sync.get(['model', 'rate', 'pitch'], function(result) {
  // Restaura los valores seleccionados en los elementos select e input
  if(result.model){
    voiceSelect.value = result.model;
  }
  if (result.rate) {
      rateElmnt.value = result.rate;
  }
  if (result.pitch) {
      pitchElmnt.value = result.pitch;
  }
});

// Maneja los cambios en los elementos select e input y guarda los valores
voiceSelect.addEventListener('change', function() {
  const selectedModel = voiceSelect.value;
  chrome.storage.sync.set({ 'model': selectedModel });
});
rateElmnt.addEventListener('input', function() {
  const selectedRate = rateElmnt.value;
  chrome.storage.sync.set({ 'rate': selectedRate });
});

pitchElmnt.addEventListener('input', function() {
  const selectedPitch = pitchElmnt.value;
  chrome.storage.sync.set({ 'pitch': selectedPitch });
});