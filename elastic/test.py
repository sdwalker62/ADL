import requests

url = "http://localhost:8200/upload"

response = requests.post(
    url,
    params={"query": "1"}
)

print(response.json())