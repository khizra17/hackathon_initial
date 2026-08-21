import requests

response = requests.post('http://127.0.0.1:5001/agent', json={
    "skills": ["Python", "Git"],
    "target_role": "AI Engineer",
    "question": "What should I learn next?"
})

print(response.status_code)
print(response.json())