const wrapperSettings = document.getElementById('setting_wrapper');
let actualSetting = document.querySelector('.setting_select');

wrapperSettings.addEventListener('click', (event) => {
  
  if (!event.target.classList.contains('settings'))
    return; // Ignorar los clics en elementos que no tengan la clase 'settings'

    if (actualSetting !== event.target) {
        actualSetting.classList.remove('setting_select');
        event.target.classList.add('setting_select');
        actualSetting = event.target;
    }
});