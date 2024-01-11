import os
import json

import uvicorn
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from elasticsearch import Elasticsearch

from elastic_utils import prepare_files, extract_text


load_dotenv("./elastic.env")
accepted_exts = [".md", ".pdf"]



client = Elasticsearch(
    os.getenv("ES_URI"),
    ca_certs=os.getenv("HTTP_CERTIFICATE_PATH"),
    api_key=(
        os.getenv("API_KEY_ID"),
        os.getenv("API_KEY_SECRET")
    )
)



class Item(BaseModel):
    query: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/update")
def update():
    INDEX = "documents"

    all_files = []
    for path, _, files in os.walk(os.getenv("DOCUMENTS_PATH")):
        for name in files:
            if Path(name).suffix in accepted_exts:
                all_files.append(os.path.join(path, name))

    files = prepare_files(client, INDEX, all_files)

    if files[0]:
        for file in files[0]:
            file_path = list(file.keys())[0]
            response = client.update(
                index=INDEX,
                id=file[file_path][1],
                doc=extract_text(file_path)
            )
            print(response)
    
    if files[1]:
        for file in files[1]:
            file_path = list(file.keys())[0]
            response = client.delete(
                index=INDEX,
                id=file[file_path][1]
            )
            print(response)
    
    if files[2]:
        body = []
        for file in all_files:
            body.append(
                {"index": {"_index": INDEX}}
            )
            body.append(
                extract_text(file)
            )

        response = client.bulk(
            index=INDEX,
            body=body
        )
        print(response)

    return json.dumps({"status": "200"})


@app.get("/query")
def query():
    response = client.search(
        index="documents", query={
            "multi_match": {
                "query": "Python",
                "fields": ["title", "content"]
            }
        }
    )

    return json.dumps(response.body)


@app.post("/delete")
def delete():
    INDEX = "documents"
    client.options(
        ignore_status=[400,404]
    ).indices.delete(index=INDEX)

    return json.dumps({"status": "200"})



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8200)