function onJSON_checkValidPlanet(json){
    if(formStatus.planet = json.valid)
        document.querySelector('.planet').classList.remove('error');
    else 
      document.querySelector('.planet').classList.add('error');
}

function checkPlanet(event){
    const checkValidPlanet_request = "checkValidPlanet.php?q=" + encodeURIComponent(String(input_planet.value).toLowerCase());
    fetch(checkValidPlanet_request).then(onResponse).then(onJSON_checkValidPlanet);
}

function checkConfirmPassword(event){
    if(formStatus.confirm_password = input_confirmPassword.value === input_password.value)
        document.querySelector('.confirm_password').classList.remove('error');
       else
         document.querySelector('.confirm_password').classList.add('error');
}

function checkPassword(event){
    if (formStatus.password = input_password.value.length >= 8)
        document.querySelector('.password').classList.remove('error');
    else 
        document.querySelector('.password').classList.add('error');
}

function onJSON_checkUsername(json){
    if (formStatus.username = !json.exists) 
        document.querySelector('.username').classList.remove('error'); 
    else 
        document.querySelector('.username').classList.add('error');
}

function onResponse(response){
    if (!response.ok) 
       return null;

    return response.json();
}

function checkUsername(event) {
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input_username.value)) {
        input_username.parentNode.parentNode.querySelector('span').textContent = "Massimo 15 caratteri: a-z, A-Z, 0-9, _";
        input_username.parentNode.parentNode.classList.add('error');
        formStatus.username = false; 
    } else{
        const checkUsername_request = "checkUsername.php?q=" + encodeURIComponent(String(input_username.value).toLowerCase());
        fetch(checkUsername_request).then(onResponse).then(onJSON_checkUsername);
    }    
}

const formStatus = {'upload': true}; 

const input_username = document.querySelector('.username input');
const input_password = document.querySelector('.password input');
const input_confirmPassword = document.querySelector('.confirm_password input');
const input_planet = document.querySelector('.planet input');

input_username.addEventListener('blur', checkUsername);
input_password.addEventListener('blur', checkPassword);
input_confirmPassword.addEventListener('blur', checkConfirmPassword);
input_planet.addEventListener('blur', checkPlanet);