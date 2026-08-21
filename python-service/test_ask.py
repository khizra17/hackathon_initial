import requests

response = requests.post('http://127.0.0.1:5001/ask', json={
    "question": "How do I become an AI Engineer?"
})

print(response.status_code)
print(response.json())