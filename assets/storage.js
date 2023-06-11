chrome.storage.sync.get(['model', 'rate', 'pitch'], function(result) {
    // Restaura los valores seleccionados en los elementos select e input
    if (result.model) {
      ContainerTrigget.children[0].textContent = result.model.text;
      ContainerTrigget.children[0].setAttribute('data-lang', result.model.data_lang);
      ContainerTrigget.children[0].setAttribute('data-name', result.model.data_name);
    }
    if (result.rate) {
      rateElmnt.value = result.rate;
    }
    if (result.pitch) {
      pitchElmnt.value = result.pitch;
    }
  });
  
  // Maneja los cambios en los elementos select e input y guarda los valores
  SaveBtn.addEventListener('click', function() {
    chrome.storage.sync.set({
      'model': {
        'text': ContainerTrigget.children[0].textContent,
        'data_lang': ContainerTrigget.children[0].getAttribute('data-lang'),
        'data_name': ContainerTrigget.children[0].getAttribute('data-name')
      }
    });
  });
  
  rateElmnt.addEventListener('input', function() {
    chrome.storage.sync.set({ 'rate': rateElmnt.value });
  });
  
  pitchElmnt.addEventListener('input', function() {
    chrome.storage.sync.set({ 'pitch': pitchElmnt.value });
  });