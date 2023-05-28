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

// rimuove l'elemento dall'array likedPicsArray
function onJSON_unlikePic(json){
    if(json.removed){ 
        let indexToRemove = likedPicsArray.indexOf(json.id);
        if(indexToRemove !== -1) 
           likedPicsArray.splice(indexToRemove, 1);
        else console.log("non trovato");
    }
}

function removeLike(modalBox){
    const formData = new FormData();

    formData.append('id', modalBox.dataset.id);
    fetch("remove_from_liked.php",
    {
        method: 'post', 
        body: formData
    }).then(onResponse).then(onJSON_unlikePic);
}

function onJSON_LikePic(json){ 
    const likedButton = document.querySelector(".like-button");
    
    if(!likedButton.classList.contains('liked'))
        likedButton.classList.add('liked');
    else {
        // rimuovo il like se c'era già il like 
        likedButton.classList.remove('liked');
        removeLike(likedButton.parentNode.parentNode.parentNode);
    } 
} 

function addToLiked(event){
    const modalContainer_likedPic = event.currentTarget.parentNode.parentNode.parentNode;
    const formData = new FormData();

    if(!likedPicsArray.includes(modalContainer_likedPic.dataset.id))
       likedPicsArray.push(modalContainer_likedPic.dataset.id);
    
    formData.append('id', modalContainer_likedPic.dataset.id);
    formData.append('title', modalContainer_likedPic.dataset.title);
    formData.append('image', modalContainer_likedPic.dataset.image);
    fetch("like_picture.php",
    {
        method: 'post', 
        body: formData
    }).then(onResponse).then(onJSON_LikePic);
    event.stopPropagation();
}

function closeModal(){
    const modal_view = document.getElementById("modal-view");
    modal_view.innerHTML = '';

    modal_view.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function showInfoImage(event){
    const modal_view = document.getElementById("modal-view");
    const selectedPic = event.currentTarget; // box

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // mi servono per addToLiked()
    modalContainer.dataset.id = selectedPic.dataset.id;
    modalContainer.dataset.image = selectedPic.dataset.image;
    modalContainer.dataset.title = selectedPic.dataset.title;

    // header della modale
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const title = document.createElement('h2');
    title.textContent = selectedPic.dataset.title;
    modalHeader.appendChild(title);

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');

    const likeButton = document.createElement('div');
    likeButton.classList.add('like-button');
    likeButton.addEventListener('click', addToLiked);

    // controllo se la foto selezionato si trova nell'array likedPicsArray
    if(likedPicsArray.includes(selectedPic.dataset.id))
        likeButton.classList.add('liked');
    
    iconsContainer.appendChild(likeButton);

    const closeButton = document.createElement('div');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', closeModal);
    iconsContainer.appendChild(closeButton);

    modalHeader.appendChild(iconsContainer);
    modalContainer.appendChild(modalHeader);

    // blocco contenuti della modale
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const image = document.createElement('img');
    image.src = selectedPic.dataset.image;
    modalContent.appendChild(image);
    const description = document.createElement('p');
    description.textContent = selectedPic.dataset.description;
    modalContent.appendChild(description);
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

function onJSON_Home(json){
    console.log(json);

    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    const items = json.collection.items;

    // se la ricerca non produce risulati
    if(json.collection.items.length === 0){
        notFound();
        return;
    }

    for(const item of items){

        if(item.data[0].media_type === "image"){ 
            const box = document.createElement('div');
            box.classList.add('box');

            box.dataset.title = item.data[0].title;
            box.dataset.description = item.data[0].description;
            box.dataset.id = item.data[0].nasa_id;
            box.dataset.image = item.links[0].href;

           const image = document.createElement('img');
           image.src = item.links[0].href;
           box.appendChild(image);

           box.addEventListener('click', showInfoImage);

           library.appendChild(box);
        }
    }
}

function onResponse(response){
    if(!response.ok)
      return null;
    
    console.log(response);
    return response.json();
}

function search(event){
    const form_data = new FormData(document.querySelector("#form"));
    fetch("search_home.php?q=" + 
           encodeURIComponent(form_data.get('cerca'))).then(onResponse).then(onJSON_Home);

    event.preventDefault();
}

function onJSON_alreadyLiked(json){
    // riempio l'array likedPicsArray con le foto a cui l'utente loggato aveva già messo like
    for(let item of json){
        likedPicsArray.push(item.pictureid);
    }
}

const likedPicsArray = [];
fetch("already_liked.php").then(onResponse).then(onJSON_alreadyLiked); 

const form = document.querySelector('#form');
form.addEventListener('submit', search);

const menu = document.querySelector('#menu');
menu.addEventListener('click', openMenu);