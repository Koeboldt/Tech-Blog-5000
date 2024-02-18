const loginHandler = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#usernameInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
    if(username && password){
        const response = await fetch('/api/users/login',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-type': 'application/json'}
        });
        if (response.ok){
            document.location.replace('/');
        } else {
            alert('login failed');
        }
    }
};
document.querySelector('#loginHandler').addEventListener('submit', loginHandler);