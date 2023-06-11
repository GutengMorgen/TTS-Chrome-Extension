//local storage
chrome.storage.sync.get(['rate', 'pitch'], function(result) {
    // Restaura los valores seleccionados en los elementos select e input
    // if(result.model){
    //     ContainerTrigget.children[0].textContent = result.model;
    // }
    if (result.rate) {
        rateElmnt.value = result.rate;
    }
    if (result.pitch) {
        pitchElmnt.value = result.pitch;
    }
});
  
  // Maneja los cambios en los elementos select e input y guarda los valores
//   voiceSelect.addEventListener('change', function() {
//     const selectedModel = voiceSelect.value;
//     chrome.storage.sync.set({ 'model': selectedModel });
//   });
  rateElmnt.addEventListener('input', function() {
    const selectedRate = rateElmnt.value;
    chrome.storage.sync.set({ 'rate': selectedRate });
  });
  pitchElmnt.addEventListener('input', function() {
    const selectedPitch = pitchElmnt.value;
    chrome.storage.sync.set({ 'pitch': selectedPitch });
  });