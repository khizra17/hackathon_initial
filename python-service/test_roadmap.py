import requests

response = requests.post('http://127.0.0.1:5001/roadmap', json={
    "skills": ["Python", "Git"],
    "target_role": "AI Engineer"
})

print("Status:", response.status_code)
print("Raw text:", response.text)