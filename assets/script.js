const synth = window.speechSynthesis;

const createBtn = document.getElementById('createBtn');
const voiceSelect = document.querySelector("select");
let voices;

function populateVoiceList() {
  voices = synth.getVoices();
  let optgroups = {};

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name}`;
    option.value = i;

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
  // populateVoiceList();
})

// populateVoiceList();