function closeMenu(event){
    const menu = document.querySelector('#menu');
    menu.classList.remove('hidden');

    const jumpMenu = event.currentTarget.parentNode.parentNode;
    jumpMenu.innerHTML = '';
    jumpMenu.classList.add('hidden');
}

// funzione per aprire il menù a tendina in versione mobile
function openMenu(event){
    const header = document.querySelector("#header");
    const menu = document.querySelector('#menu');
    menu.classList.add('hidden');

    const jumpMenu = document.createElement('div');
    jumpMenu.classList.add('open-menu');

    const menuHeader = document.createElement('div');
    menuHeader.classList.add('menu-header');

    const close = document.createElement('div');
    close.textContent = 'X';
    close.classList.add('close-menu');
    close.addEventListener('click', closeMenu);
    menuHeader.appendChild(close);
    jumpMenu.appendChild(menuHeader);

    const linkHome = document.createElement('a');
    linkHome.textContent = 'Home';
    linkHome.href = 'home.php';
    linkHome.classList.add('link-menu');
    jumpMenu.appendChild(linkHome);

    const linkMars = document.createElement('a');
    linkMars.textContent = 'Mars Rover';
    linkMars.href = 'mars_rover.php';
    linkMars.classList.add('link-menu');
    jumpMenu.appendChild(linkMars);

    const linkProfile = document.createElement('a');
    linkProfile.textContent = 'Profile';
    linkProfile.href = 'profile.php';
    linkProfile.classList.add('link-menu');
    jumpMenu.appendChild(linkProfile);

    const linkLogout = document.createElement('a');
    linkLogout.textContent = 'Logout';
    linkLogout.href = 'logout.php';
    linkLogout.classList.add('link-menu');
    jumpMenu.appendChild(linkLogout);

    header.appendChild(jumpMenu);
}

function notFound(){
    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    const box_noResults = document.createElement('div');
    box_noResults.classList.add('no-results');

    const p = document.createElement('p');
    p.textContent = "No results";
    box_noResults.appendChild(p);

    library.appendChild(box_noResults);
}

function onJSON_APOD(json){
    console.log(json);

    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    const box = document.createElement('div');
    box.classList.add('box');

    const title = document.createElement('h1');
    title.textContent = json.title;
    box.appendChild(title);

    if(json.media_type === "image"){
        const image = document.createElement('img');
        image.src = json.url;
        box.appendChild(image);
    } else {
        notFound();
        return;
    }

    const explanation = document.createElement('p');
    explanation.textContent = json.explanation;
    box.appendChild(explanation);
    
    library.appendChild(box);
}

function onResponse(response){
    if(!response.ok)
       return null;
    
    console.log(response);
    return response.json();
}

function searchAPOD(event){
    const form_data = new FormData(document.querySelector("#form"));

    fetch("search_AstropicOfTheDay.php?q=" + 
           encodeURIComponent(form_data.get('cerca'))).then(onResponse).then(onJSON_APOD);

    event.preventDefault();
}

const form = document.querySelector('#form');
form.addEventListener('submit', searchAPOD);

const menu = document.querySelector('#menu');
menu.addEventListener('click', openMenu);