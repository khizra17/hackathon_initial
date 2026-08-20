fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Khizra Nasir',
    email: 'khizra@test.com',
    password: 'test1234',
    role: 'student'
  })
})
  .then(res => {
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Raw response:', text))
  .catch(err => console.error('Error:', err));
