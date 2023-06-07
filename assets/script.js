const texta = document.getElementById('input');
const btn = document.getElementById('btn');

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

if ('speechSynthesis' in window) {
  // Crear un objeto de síntesis de voz
  const  synthesis = window.speechSynthesis;
  
  btn.addEventListener('click', () => {
    // Crear un nuevo objeto de discurso
    const  utterance = new SpeechSynthesisUtterance(texta.value);

    // Configurar opciones adicionales (opcional)
    utterance.lang = 'en-En'; // Configurar el idioma
    utterance.rate = 2; // Configurar la velocidad (valor por defecto: 1.0)
    utterance.pitch = .2; // Configurar el tono (valor por defecto: 1.0)


    // Iniciar la síntesis de voz
    synthesis.speak(utterance);
  })
}
