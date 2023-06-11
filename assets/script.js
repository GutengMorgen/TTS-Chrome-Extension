const SaveBtn = document.getElementById('SaveBtn');
const testingBtn = document.getElementById('testingVoice');
const rateElmnt = document.getElementById('rate');
const pitchElmnt  = document.getElementById('pitch');
const myTable = document.getElementById('mytable');

let voices;
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = CustomSelect;
}

function CustomSelect() {
  voices = window.speechSynthesis.getVoices();
  let thElement = {}, tbodyElement = {};
  let filter;
  let lang;

  for (let i = 0; i < voices.length; i++) {
    //filter
    filter = (voices[i].name).split('-')[0];

    // set atributes of td elements
    const tdElement = document.createElement('td');
    tdElement.classList.add('AsOption');
    tdElement.setAttribute('data-lang', voices[i].lang);
    tdElement.setAttribute('data-name', voices[i].name);
    tdElement.textContent = filter;
    // set atributes of td elements

  
    lang = voices[i].lang;
    if(!thElement[lang]){
      tbodyElement[lang] = document.createElement('tbody');
      thElement[lang] = document.createElement('th');
      thElement[lang].textContent = lang.toUpperCase();
    }
    tbodyElement[lang].appendChild(thElement[lang]);
    tbodyElement[lang].appendChild(tdElement);

  }

  for (const lang in tbodyElement) {
    myTable.appendChild(tbodyElement[lang]);

    for (const child of tbodyElement[lang].children){

      if(child.tagName.toLowerCase() === 'th'){

        child.setAttribute('colspan', '3');
        const tr = document.createElement('tr');
        tr.appendChild(child);

        tbodyElement[lang].insertBefore(tr, tbodyElement[lang].firstChild);

        break;
      }
    }

  }
}

SaveBtn.addEventListener('click', () => {
  const objt = {
    voice: {},
    voiceName: ContainerTrigget.children[0].getAttribute('data-name'),
    lang: ContainerTrigget.children[0].getAttribute('data-lang'),
    rate: rateElmnt.value,
    pitch: pitchElmnt.value
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { data: objt });
  });

  // window.close();
});

testingBtn.addEventListener('click', () => {

  const utterance = new SpeechSynthesisUtterance();
  const _lang = ContainerTrigget.children[0].getAttribute('data-lang');
  let text = 'Default text';
  if(_lang  === 'es-MX') text = 'Esta e mi estupida voz, 1 2 3 4 5';

  else text = 'This is my stupid voice, 1 2 3 4 5';

  utterance.voice = voices.find(v => v.name === ContainerTrigget.children[0].getAttribute('data-name'));
  utterance.lang = _lang;
  utterance.rate = rateElmnt.value;
  utterance.pitch = pitchElmnt.value;
  utterance.text = text;

  utterance.onstart = () => {
    testingBtn.disabled = true;
  };
  
  utterance.onend = () => {
    testingBtn.disabled = false;
  };

  speechSynthesis.speak(utterance);
});