function killAllRepos(){
    let childs = container.childNodes;
    childs = Array.from(childs);
    childs.forEach((div) => {
        div.remove();
    });
}
function addCard(data){
    const fragment = document.createDocumentFragment();
    let value = fromLocalStorage(data.innerText);
    let {name, login, stargazers_count} = value;
    const card = document.createElement('div');
    card.classList.add('card', 'card-description');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
     
    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = name;
    cardBody.appendChild(title);
     
    const owner = document.createElement('div');
    owner.classList.add('card-title', 'card-therest');
    owner.textContent = 'owner: ' + login;
    cardBody.appendChild(owner);
    
    const stars = document.createElement('div');
    stars.classList.add('card-title', 'card-therest');
    stars.textContent = 'stars: ' + stargazers_count;
    cardBody.appendChild(stars);
     
    const cross = document.createElement('div');
    cross.classList.add('card-exit');
    cardBody.appendChild(cross);
     
    card.appendChild(cardBody);
    fragment.appendChild(card);
    cardsContainer.appendChild(fragment);
}

function makePage(data){
    const fragment = document.createDocumentFragment();
    data.forEach(post => {
        let {name} = post;
        const card = document.createElement("div");
        card.classList.add('card','card-preview');
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = name;
        cardBody.appendChild(title);
        card.appendChild(cardBody);
        fragment.appendChild(card);
    });
    killAllRepos();
    container.appendChild(fragment);
}

function toLocalStorage(data){
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

function fromLocalStorage(data){
    let value = localStorage.getItem('obj');
    value = JSON.parse(value);
    const cardData = value[data];
    return cardData;
}

async function handler(e){
    let result = null;
    try{
      result = await getPage(e.target.value)
    }catch(e){
      throw e;
    }
}
async function getPage(value){
    let result = await getData(value);
    makePage(result);
}

async function getData(value){
    let response = await fetch(`https://api.github.com/search/repositories?q=${value}`);
    let repos = await response.json();
    if(repos.items);
    repos.items.splice(5);
    toLocalStorage(repos.items);
    return repos.items;
};

function debounce(cb, debounceTime){
    let timeout;
    return function() {
        const self = this;
        const args = arguments;
        const functionCall = () => {
            return cb.apply(self, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(functionCall, debounceTime);
    }
};