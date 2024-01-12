#!/bin/bash

# kernel setting
sudo sysctl -w vm.max_map_count=262144

# get new credentials
ES_PASSWORD=$(echo y | docker exec -i es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic | awk -F ': ' '{print $2}' | xargs)
KB_ENROLLMENT_TOKEN=$(docker exec -i es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana | rev | cut -c 1- | rev)
echo $ES_PASSWORD | xargs -I{} sed -i '/^ES_PASSWORD=/s/=.*/="{}"/' elastic.env
echo $KB_ENROLLMENT_TOKEN | xargs -I{} sed -i '/^KB_ENROLLMENT_TOKEN=/s/=.*/="{}"/' elastic.env

# get http cert
docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

# create/save API key to JSON
curl -X POST "https://localhost:9200/_security/api_key" --cacert http_ca.crt -u elastic:$ES_PASSWORD -H 'Content-Type: application/json' -d'
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
' > /tmp/temporary_credentials.json

# set environment variables
jq -r '.id' /tmp/temporary_credentials.json | xargs -I{} sed -i '/^API_KEY_ID=/s/=.*/="{}"/' elastic.env
jq -r '.api_key' /tmp/temporary_credentials.json | xargs -I{} sed -i '/^API_KEY_SECRET=/s/=.*/="{}"/' elastic.env
sudo rm /tmp/temporary_credentials.json