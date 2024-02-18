const loginHandler = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#emailInput').value.trim();
    const username = document.querySelector('#usernameInput').value.trim();
    const password = document.querySelector('#passwordInput').value.trim();
    if(username && password && email){
        const response = await fetch('/api/users/signup',{
            method: 'POST',
            body: JSON.stringify({username,email,password}),
            headers: { 'Content-type': 'application/json'}
        });
        if (response.ok){
            alert('signup successful please log in');
            document.location.replace('/login');
        } else {
            alert('signup failed');
        }
    }
};
document.querySelector('#signupHandler').addEventListener('submit', loginHandler);