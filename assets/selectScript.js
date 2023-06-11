const ContainerTrigget = document.getElementById('select_trigger');
const CotainerOptions = document.getElementById('select_options');

ContainerTrigget.addEventListener('click', () => {
    CotainerOptions.classList.toggle('show');
    
    CotainerOptions.querySelectorAll('.AsOption').forEach(options  => {
        options.addEventListener('click', (event) => handleClickOptions(event.target));
    });
});

let selectedOption;
function handleClickOptions(currentOption) {
    ContainerTrigget.children[0].textContent = currentOption.textContent;
    ContainerTrigget.children[0].setAttribute('data-lang', currentOption.getAttribute('data-lang'));
    ContainerTrigget.children[0].setAttribute('data-name', currentOption.getAttribute('data-name'));

    if(selectedOption) selectedOption.classList.remove('selected');
    currentOption.classList.add('selected');
    selectedOption = currentOption;
    
    CotainerOptions.classList.remove('show');
}

document.addEventListener('click', e => {
    if (!ContainerTrigget.contains(e.target) && !CotainerOptions.contains(e.target)) CotainerOptions.classList.remove('show');
});