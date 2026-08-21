fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'khizra@test.com',
        password: 'test1234'
    })
})
    .then(res => {
        console.log('Status:', res.status);
        return res.json();
    })
    .then(data => console.log('Response:', data))
    .catch(err => console.error('Error:', err));