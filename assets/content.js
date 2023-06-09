
const selObj = window.getSelection();

const handleSpeak = () => {

  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'en-En';
  utterance.rate = 2.5;
  utterance.pitch = 0;
  utterance.text = selObj.toString();
  console.log(utterance);

  // window.speechSynthesis.speak(utterance);
  return utterance;
}


const handleKeyDown = (e) => {
  if(selObj.toString() === '') return;

  // console.log(e);
  if(e.altKey && e.keyCode === 83){
    speechSynthesis.speak(handleSpeak());
  }
};


document.addEventListener('keydown', handleKeyDown);