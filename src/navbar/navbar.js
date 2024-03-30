document.getElementById('open-menu').addEventListener('click', function() {
    document.getElementById('menu').style.left = (document.getElementById('menu').style.left === '-200px') ? '0px' : '-200px';
});

document.getElementById('close-menu').addEventListener('click', function() {
    document.getElementById('menu').style.left = (document.getElementById('menu').style.left === '0px') ? '-200px' : '0px';
});

window.addEventListener('resize', function() {
    let menuLeftPos = document.getElementById('menu').style.left
    if(window.innerWidth > 1100 && menuLeftPos === '0px') {
       document.getElementById('menu').style.left = '-200px';
    }
});