import requests

url = "http://127.0.0.1:5001/analyze"

payload = {
    "skills": ["Python", "Git"],
    "target_role": "AI Engineer"
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response:", response.json())