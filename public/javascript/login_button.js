document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');

    function toggleLoginButton() {
        if (emailInput.value && passwordInput.value) {
            loginButton.disabled = false;
            loginButton.classList.add('enabled');
        } else {
            loginButton.disabled = true;
            loginButton.classList.remove('enabled');
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = emailInput.value;
        const password = passwordInput.value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Invalid email or password');
            }
        })
        .then(data => {
            alert('Login successful');
            // Handle successful login (e.g., redirect to another page)
        })
        .catch(error => {
            alert(error.message); // Show popup for invalid login
        });
    });

    emailInput.addEventListener('input', toggleLoginButton);
    passwordInput.addEventListener('input', toggleLoginButton);
});