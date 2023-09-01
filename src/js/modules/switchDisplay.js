function swapScreen() {
    const today = document.querySelector('.body');
    const details = document.querySelector('.details');

    today.setAttribute('style', 'display: none');
    details.removeAttribute('style');
}

export { swapScreen };