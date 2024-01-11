import pprint
import requests

url = "http://localhost:8200/create"

response = requests.post(
    url,
    params={"query": "1"}
)

pprint.pprint(response.json())
