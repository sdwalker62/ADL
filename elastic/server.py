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

@app.post("/create")
def create():
    INDEX = "documents"

    all_files = []
    for path, _, files in os.walk(os.getenv("DOCUMENTS_PATH")):
        for name in files:
            if Path(name).suffix in accepted_exts:
                all_files.append(os.path.join(path, name))

    files_to_add, files_to_delete = prepare_files(client, INDEX, all_files)
    
    if files_to_add:
        for file in files_to_add:
            client.index(
                index=INDEX,
                document=extract_text(file)
            )

    if files_to_delete:
        for file in files_to_delete:
            file_path = list(file.keys())[0]
            client.delete(
                index=INDEX,
                id=file[file_path]
            )

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