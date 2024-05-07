document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    let response;

    try {
        response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const result = await response.json();
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Não existe';
            } else if (response.status === 401) {
                errorMessage = 'Email ou senha incorreto';
            } else {
                errorMessage = 'Email ou senha incorreto';
            }
            throw new Error(errorMessage);
        }

        window.location.href = 'http://localhost:5000/add'; 
    } catch (error) {
        console.log('Falha:', error);
        document.getElementById('message').textContent = error.message;
    }
});
