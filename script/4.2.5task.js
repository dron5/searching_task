const searchInput = document.getElementById('myInput');
const container = document.querySelector('.container');
const cardsContainer = document.querySelector('.container-cards');

searchInput.addEventListener('input', 
    debounce(inputValueTransferHandler, 800)
);

container.addEventListener('click', (e) => {
    let target = e.target.closest('.card');
    if (!target) return;
    if (!container.contains(target)) return;
    addCard(target);
    destroyReposList();
    searchInput.value = '';
});

cardsContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.card-close');
    if (!target) return;
    if (!cardsContainer.contains(target)) return;
    target.closest('.card').remove();
})
