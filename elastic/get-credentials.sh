#!/bin/bash

# get new credentials
docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

# get http cert
docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

# create/save API key to JSON
curl -X POST "https://localhost:9200/_security/api_key" --cacert http_ca.crt -u elastic -H 'Content-Type: application/json' -d'
{
  "name": "temp-key",
  "role_descriptors": {
    "role_name": {
      "cluster": ["all"],
      "indices": [{
        "names": ["*"],
        "privileges": ["all"]
      }]
    }
  }
}
' | python -c "import sys, json; with open('api_key.json', 'w') as f: json.dump(sys.stdin, f)"