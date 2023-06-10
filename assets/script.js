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
// populateVoiceList();

createBtn.addEventListener('click', () => {

  const objt = {
    'voiceName': voiceSelect.value,
    'rate': rateElmnt.value,
    'pitch': pitchElmnt.value
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { data: objt });
  });

  window.close();
})