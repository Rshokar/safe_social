//The logout function, sends user back to index.html
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        location.replace('index.html');
    })
})