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
    option.setAttribute('data-lang', voices[i].lang)
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
// populateVoiceList();

createBtn.addEventListener('click', () => {

  const objt = {
    'voiceName': voiceSelect.selectedOptions[0].value,
    'voice': {},
    'lang': voiceSelect.selectedOptions[0].getAttribute('data-lang'),
    'rate': rateElmnt.value,
    'pitch': pitchElmnt.value
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { data: objt });
  });

  window.close();
})


//local storage
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