const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    if (email === 'admin@gmail.com' && password === 'password') {
        window.location.href = 'admin-dashboard.html';
    } else if (email === 'staff@gmail.com' && password === 'password') {
        window.location.href = 'staff-dashboard.html';
    } else {
        window.location.href = 'user-dashboard.html';
    }
});