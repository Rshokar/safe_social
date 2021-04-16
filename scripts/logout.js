/**
 * 
 * @author Trevor Hong 
 * @version 1.0
 */
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.replace('index.html');
  })
})