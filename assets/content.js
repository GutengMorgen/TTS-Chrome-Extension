
const selObj = window.getSelection();

const handleSpeak = () => {

  const utterance = new SpeechSynthesisUtterance(selObj.toString());
  utterance.lang = 'en-En';
  utterance.rate = 2.5;
  utterance.pitch = 0;

  window.speechSynthesis.speak(utterance);
}


const handleKeyDown = (e) => {
  if(selObj.toString() === '') return;

  // console.log(e);
  if(e.altKey && e.keyCode === 83){
    handleSpeak();
  }
};


document.addEventListener('keydown', handleKeyDown);