const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODc2OTdiZDcyZDQzMWIwM2QwYjRiOSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzg3Mjc2OTQzLCJleHAiOjE3ODczNjMzNDN9.cE9q_IDpB3nTCoTVzNemc2Yn9JgncF2wKSLqknpTlWM';

fetch('http://localhost:5000/api/skills', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(res => {
        console.log('Status:', res.status);
        return res.json();
    })
    .then(data => console.log('Response:', data))
    .catch(err => console.error('Error:', err));