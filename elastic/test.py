import requests
import pprint

url = "http://localhost:8200/query"

response = requests.get(
    url,
    params={"query": "1"}
)

pprint.pprint(response.json())