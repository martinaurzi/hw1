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

    const linkMars = document.createElement('a');
    linkMars.textContent = 'Mars Rover';
    linkMars.href = 'mars_rover.php';
    linkMars.classList.add('link-menu');
    jumpMenu.appendChild(linkMars);

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

function removeFromLiked(event){
    const modalContainer_likedPic = event.currentTarget.parentNode.parentNode.parentNode;
    const formData = new FormData();

    closeModal();
    formData.append('id', modalContainer_likedPic.dataset.id);
    fetch("remove_from_liked.php",
    {
        method: 'post', 
        body: formData
    }).then(fetchLikedPictures);
}

function showInfoLikedPic(event){
    const modal_view = document.getElementById("modal-view");
    const selectedPic = event.currentTarget;

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    modalContainer.dataset.id = selectedPic.dataset.id;  

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header'); 
    const title = document.createElement('h2');
    title.textContent = selectedPic.dataset.title;
    modalHeader.appendChild(title);

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    const likedButton = document.createElement('div');
    likedButton.classList.add('liked-button');
    likedButton.addEventListener('click', removeFromLiked);
    iconsContainer.appendChild(likedButton);

    const closeButton = document.createElement('div');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button'); 
    closeButton.addEventListener('click', closeModal);
    iconsContainer.appendChild(closeButton);

    modalHeader.appendChild(iconsContainer);
    modalContainer.appendChild(modalHeader);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const image = document.createElement('img');
    image.src = selectedPic.dataset.image;
    modalContent.appendChild(image);
    modalContainer.appendChild(modalContent);

    modal_view.appendChild(modalContainer);

    modal_view.classList.remove('hidden');
    document.body.classList.add('no-scroll');
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

function onJSON_likedPics(json){
    console.log(json);

    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    if(json.length === 0){
        notFound();
        return;
    }

    for(const item of json){
        const box = document.createElement('div');
        box.classList.add('box');

        const image = document.createElement('img');
        image.src = item.picture.image;
        box.appendChild(image);

        box.dataset.id = item.pictureid;
        box.dataset.title = item.picture.title;
        box.dataset.image = item.picture.image;

        box.addEventListener('click', showInfoLikedPic);

        library.appendChild(box);
    }
}

function onResponse(response){
    if (!response.ok)
       return null;

    console.log(response);
    return response.json();
}

function fetchLikedPictures(){
    fetch("fetch_likedPictures.php").then(onResponse).then(onJSON_likedPics);
}

fetchLikedPictures();

const menu = document.querySelector('#menu');
menu.addEventListener('click', openMenu);