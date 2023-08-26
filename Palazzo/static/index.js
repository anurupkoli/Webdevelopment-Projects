let toggleMenu = () => {
    console.log("event");
    let menuBox = document.getElementById('menuBox');
    if (menuBox.style.display != 'none') {
        menuBox.style.display = 'none';
    }
    else {
        menuBox.style.display = 'block';
    }
}

let cl = document.getElementById('close');
cl.addEventListener('click', toggleMenu);
let menu = document.getElementById('menu');
menu.addEventListener('click', toggleMenu);
