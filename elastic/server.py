import os
import json
import fitz
import uvicorn
import frontmatter

from pprint import pprint
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from elasticsearch import Elasticsearch

load_dotenv("./elastic.env")


client = Elasticsearch(
    "https://localhost:9200/",
    ca_certs=os.getenv("HTTP_CERT_PATH"),
    api_key=(
        os.getenv("API_KEY_ID"),
        os.getenv("API_KEY_SECRET")
    )
)

def organize_pdf_metadata(data, file):
    new_data = dict()
    if not data["title"]:
        new_data["title"] = Path(file).stem
    if data["author"]:
        new_data["author"] = data["author"]
    if data["creationDate"]:
        date = data["creationDate"]
        new_data["date_created"] = "-".join([date[2:6], date[6:8], date[8:10]])
    if data["modDate"]:
        date = data["modDate"]
        new_data["date_modified"] = "-".join([date[2:6], date[6:8], date[8:10]])
    if data["content"]:
        new_data["content"] = data["content"]
    new_data["file_type"] = Path(file).suffix

    return new_data

def extract_text(file):
    ext = Path(file).suffix

    if ext == ".md":
        with open(file, 'r') as file:
            markdown_text = file.read()
        data = frontmatter.loads(markdown_text).to_dict()
        print(data)
        data["content"] = data["content"].replace("\n", " ")
        if "date_created" in data.keys():
            date = data["date_created"]
            data["date_created"] = '%s-%s-%s' % (date.year, date.month, date.day)
        if "date_modified" in data.keys():
            date = data["date_modified"]
            data["date_modified"] = '%s-%s-%s' % (date.year, date.month, date.day)
        data["file_type"] = ext

    elif ext == ".pdf":
        with fitz.open(file) as pages:
            data = pages.metadata
            texts = [page.get_text() for page in pages]
            data["content"] = ' '.join(texts).replace("\n", " ")
            data = organize_pdf_metadata(data, file)

    return data


class Item(BaseModel):
    query: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# TODO: Parse HTML using tags for better indexing
@app.post("/upload")
def create():
    all_files = []
    for path, _, files in os.walk(os.getenv("DOCUMENTS_PATH")):
        for name in files:
            if Path(name).suffix in [".md", ".pdf"]:
                all_files.append(os.path.join(path, name))

    try:
        existing_files = client.search(
            index="documents"
        )
    except:
        print("Index doesn't exist, or error.")
        # existing_files = {"body": []}
    # print(existing_files)

    # new_files = set(all_files).difference(set(all_files).intersection(set(existing_files.body)))
    new_files = all_files
    body = []
    for file in new_files:
        body.append(
            {"index": {"_index": "documents"}}
        )
        body.append(
            extract_text(file)
        )

    resp = client.bulk(
        body=body
    )

    return json.dumps(resp.body)

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
    pprint(dir(response))
    pprint(response.body)
    return json.dumps(response.body)

@app.post("/update")
def update():

    return

@app.post("/delete")
def delete():
    client.options(
        ignore_status=[400,404]
    ).indices.delete(index='documents')
    return json.dumps({"status": "success"})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8200)


# create API key
# POST /_security/api_key
# {
#   "name": "my-api-key",
#   "expiration": "1d",   
#   "role_descriptors": { 
#     "role_name": {
#       "cluster": ["all"],
#       "indices": [
#         {
#           "names": ["*"],
#           "privileges": ["all"]
#         }
#       ]
#     }
#   }
# }

# {
#   "id": "2DJJ24wBJ6dVx6J_i9b4",
#   "name": "my-api-key",
#   "expiration": 1704572479481,
#   "api_key": "TTLu7w2GTyKF3NwMFIDkXQ",
#   "encoded": "MkRKSjI0d0JKNmRWeDZKX2k5YjQ6VFRMdTd3MkdUeUtGM053TUZJRGtYUQ=="
# }