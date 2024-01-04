import os
import json
import fitz
import uvicorn
import markdown

from pathlib import Path
from bs4 import BeautifulSoup
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

def extract_text(file):
    ext = Path(file).suffix

    if ext == ".md":
        with open(file, 'r') as file:
            markdown_text = file.read()
        html = markdown.markdown(markdown_text)
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text().replace("\n", " ")

    elif ext == ".pdf":
        with fitz.open(file) as pages:
            texts = [page.get_text() for page in pages]
            text = ' '.join(texts)
    
    return text


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
        file_path = Path(file)
        body.append(
            {"index": {"_index": "documents"}}
        )
        body.append(
            {
                "name": file_path.stem,
                "file_type": file_path.suffix,
                "body": extract_text(file)
            }
        )

    resp = client.bulk(
        body=body
    )

    return json.dumps(resp.body)

@app.get("/query")
def query():
    resp = client.search(
        index="documents",
        body={"query": {"match": {"name": "YOLOv8"}}},
    )
    return json.dumps(resp.body)

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