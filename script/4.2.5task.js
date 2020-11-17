const searchInput = document.getElementById('myInput');
const container = document.querySelector('.container');
const cardsContainer = document.querySelector('.container-cards');
// const exit = document.querySelector('.card-exit');

searchInput.addEventListener('input', 
    debounce(handler, 800)
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
    const target = e.target.closest('.card-exit');
    if (!target) return;
    if (!cardsContainer.contains(target)) return;
    target.closest('.card').remove();
})
