const navTrigger = document.querySelector('.nav-trigger');
const sideNav = document.querySelector('.side-nav');
const sideMenu = document.querySelector('.sidebar-menu'); // admin-dashboard

const sideMenuStff = document.querySelector('.sidebar-menu-st'); // staff dashboard
const navTriggerBtn = document.querySelector('.nav-trigger');

navTrigger.addEventListener('click', () => {
    sideNav.classList.toggle('visible');
});

navTrigger.addEventListener('click', () => {
    sideMenu.classList.toggle('visible');
});

navTriggerBtn.addEventListener('click', () => {
    sideMenuStff.classList.toggle('visible');
});
