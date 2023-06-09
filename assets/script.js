const synth = window.speechSynthesis;

const modelSelect = document.getElementById('model');
const createBtn = document.getElementById('createBtn');

let voices = [];


function populateVoiceList() {
  voices = synth.getVoices();

  let _lang;

  for(const voice of voices){
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    modelSelect.appendChild(option);
  }
}

createBtn.addEventListener('click', () => {
  populateVoiceList();
})

// populateVoiceList();