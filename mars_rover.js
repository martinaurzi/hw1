function closeMenu(event){
    const menu = document.querySelector('#menu');
    menu.classList.remove('hidden');

    const jumpMenu = event.currentTarget.parentNode.parentNode;
    jumpMenu.innerHTML = '';
    jumpMenu.classList.add('hidden');
}

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

    const linkAPOD = document.createElement('a');
    linkAPOD.textContent = 'APOD';
    linkAPOD.href = 'apod.php';
    linkAPOD.classList.add('link-menu');
    jumpMenu.appendChild(linkAPOD);

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

function closeModal(){
    const modal_view = document.getElementById("modal-view");
    modal_view.innerHTML = '';

    modal_view.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function showInfoRoverImage(event){
    const modal_view = document.getElementById("modal-view");
    const selectedBox = event.currentTarget; 

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const closeButton = document.createElement('div');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', closeModal);
    modalHeader.appendChild(closeButton);

    modalContainer.appendChild(modalHeader);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const image = document.createElement('img');
    image.src = selectedBox.dataset.image;
    modalContent.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('modal-info');
    const camera = document.createElement('p');
    camera.textContent = "Camera: " + selectedBox.dataset.camera;
    info.appendChild(camera);

    const date = document.createElement('p');
    date.textContent = "Earth Date: " + selectedBox.dataset.date;
    info.appendChild(date);

    modalContent.appendChild(info);

    modalContainer.appendChild(modalContent);
    modal_view.appendChild(modalContainer);

    modal_view.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function notFound(error){
    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    const box_noResults = document.createElement('div');
    box_noResults.classList.add('no-results');

    const p = document.createElement('p');
    p.textContent = "Error: " + error;
    box_noResults.appendChild(p);

    library.appendChild(box_noResults);
}

function onJSON_MarsRover(json){
    console.log(json);

    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    if(json.errors){
        notFound(json.errors);
        return;
    }

    const result = json.photos;

    for(const res of result){
        const box = document.createElement('div');
        box.classList.add('box');

        box.dataset.image = res.img_src;
        box.dataset.date = res.earth_date;
        box.dataset.camera = res.camera.full_name;

        const image = document.createElement('img');
        image.src = res.img_src;
        box.appendChild(image);

        box.addEventListener('click', showInfoRoverImage);

        library.appendChild(box);
    }
}

function onResponse(response){
    if(!response.ok)
       return null;
    
    console.log(response);
    return response.json();
}

function searchRover(event){
    const form_data = new FormData(document.querySelector("#form"));

    fetch("search_rover.php?q=" + 
           encodeURIComponent(form_data.get('cerca'))).then(onResponse).then(onJSON_MarsRover);

    // Evito che la pagina venga ricaricata
    event.preventDefault();
}

const form = document.querySelector('#form');
form.addEventListener('submit', searchRover);

const menu = document.querySelector('#menu');
menu.addEventListener('click', openMenu);