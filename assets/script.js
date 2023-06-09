const texta = document.getElementById('input');
const btn = document.getElementById('btn');
const createBtn = document.getElementById('createBtn');

/*if ('speechSynthesis' in window) {
  // Crear un objeto de síntesis de voz
  var synthesis = window.speechSynthesis;

  // Crear un nuevo objeto de discurso
  var utterance = new SpeechSynthesisUtterance('¡Hola, esto es un ejemplo de texto a voz!');

  // Configurar opciones adicionales (opcional)
  utterance.lang = 'es-ES'; // Configurar el idioma
  utterance.rate = 1.0; // Configurar la velocidad (valor por defecto: 1.0)
  utterance.pitch = 1.0; // Configurar el tono (valor por defecto: 1.0)

  // Iniciar la síntesis de voz
  synthesis.speak(utterance);
}*/

function handleSpeak(selObj) {

  const utterance = new SpeechSynthesisUtterance(selObj.text);
  utterance.lang = 'en-En';
  utterance.rate = 2.5;
  utterance.pitch = 0;

  window.speechSynthesis.speak(utterance);
};


const handleSelect = () =>  {
  const getSelectedText = () => {
  const selObj = window.getSelection();
  // console.log(selObj);
  return {
    text: selObj.toString(),
    anchorNode: selObj.anchorNode,
    anchorOffset: selObj.anchorOffset,
    extentNode: selObj.extentNode,
    extentOffset: selObj.extentOffset,
    focusNode: selObj.focusNode,
    focusOffset: selObj.focusOffset,
    isCollapsed: selObj.isCollapsed
  };
}

  chrome.tabs.query(
    {
      active:true, 
      currentWindow: true
    },
    tabs => {
      chrome.scripting.executeScript(
        {
          target: {tabId: tabs[0].id},
          function: getSelectedText
        },
        results => {
          handleSpeak(results[0].result);
        }
      );
    }
  );
};

createBtn.addEventListener('click', handleSelect);
