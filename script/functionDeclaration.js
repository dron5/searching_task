function destroyReposList(){
    let childs = container.childNodes;
    childs = Array.from(childs);
    childs.forEach((div) => {
        div.remove();
    });
}

const makeElement = function (tagName, className, text) {
  let element = document.createElement(tagName);
  element.classList.add(...className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

function addCard(data){
    const fragment = document.createDocumentFragment();
    let value = getLocalStorage(data.innerText);
    let {name, login, stargazers_count} = value;
    
    const card = makeElement('div', ['card', 'card-description']);
    const cardBody = makeElement('div', ['card-body']);
    const title = makeElement('h3', ['card-title'], name);
    cardBody.appendChild(title);
    const owner = makeElement('div', ['card-title', 'card-therest'],
                                'owner: ' + login);
    cardBody.appendChild(owner);
    const stars = makeElement('div', ['card-title', 'card-therest'],
                                'stars: ' + stargazers_count);
    cardBody.appendChild(stars);
    const cross = makeElement('div', ['card-close']);
    cardBody.appendChild(cross);
    card.appendChild(cardBody);
    fragment.appendChild(card);
    cardsContainer.appendChild(fragment);
}

function makePage(data){
    const fragment = document.createDocumentFragment();
    data.forEach(post => {
        let {name} = post;
        const card = makeElement('div', ['card','card-preview']);
        const cardBody = makeElement('div', ['card-body']);
        const title = makeElement('h3', ['card-title'], name);
        cardBody.appendChild(title);
        card.appendChild(cardBody);
        fragment.appendChild(card);
    });
    destroyReposList();
    container.appendChild(fragment);
}

function setLocalStorage(data){
    let obj = {};
    data.forEach(post => {
        let {name, owner:{login}, stargazers_count} = post;
        obj[name] = {
            'name': name,
            'login': login,
            'stargazers_count': stargazers_count
        };
    });
    localStorage.setItem('obj', JSON.stringify(obj));
}

function getLocalStorage(data){
    let value = localStorage.getItem('obj');
    value = JSON.parse(value);
    const cardData = value[data];
    return cardData;
}

async function inputValueTransferHandler(e){
    try{
        let result = await findReposOnGit(e.target.value);
        makePage(result);
    }catch(e){
        throw e;
    }
}

async function findReposOnGit(value){
    let response = await fetch(`https://api.github.com/search/repositories?q=${value}`);
    let repos = await response.json();
    if(!repos.items) return;
    setLocalStorage(repos.items.slice(0,5));
    return repos.items.slice(0,5);
};
