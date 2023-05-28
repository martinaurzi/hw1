function closeMenu(event){
    const menu = document.querySelector('#menu');
    menu.classList.remove('hidden');

    const jumpMenu = event.currentTarget.parentNode.parentNode;
    jumpMenu.innerHTML = '';
    jumpMenu.classList.add('hidden');
}

function openMenu(event){
    const header = document.querySelector("#headerIndex");
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

    const linkLogin = document.createElement('a');
    linkLogin.textContent = 'Login';
    linkLogin.href = 'login.php';
    linkLogin.classList.add('link-menu');
    jumpMenu.appendChild(linkLogin);

    const linkSignUp = document.createElement('a');
    linkSignUp.textContent = 'Sign Up';
    linkSignUp.href = 'sign_up.php';
    linkSignUp.classList.add('link-menu');
    jumpMenu.appendChild(linkSignUp);

    header.appendChild(jumpMenu);
}

const menu = document.querySelector('#menu');
menu.addEventListener('click', openMenu);