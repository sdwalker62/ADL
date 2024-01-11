import hashlib
import datetime
from pathlib import Path

import fitz
import frontmatter



def hash_document(doc):
    BUF_SIZE = 65536
    sha256 = hashlib.sha256()

    with open(doc, 'rb') as f:
        while True:
            data = f.read(BUF_SIZE)
            if not data:
                break
            sha256.update(data)
    
    return sha256.hexdigest()


def prepare_files(client, index, all_files):
    try:
        if client.indices.exists(index=index):
            response = client.search(
                index="documents",
                query={
                    "match_all": {}
                },
                _source=["file_path", "hash", "_id"],
                size=len(all_files * 2)
            )

            existing_files = {
                i["_source"]["file_path"]: [i["_source"]["hash"], i["_id"]]
                for i in response['hits']['hits']
            }
            file_paths = existing_files.keys()

            files_to_update = []
            files_to_delete = []
            for i in file_paths:
                if i in all_files:
                    hash = hash_document(i)
                    if hash != existing_files[i][0]:
                        files_to_update.append({i: existing_files[i]})
                else:
                    files_to_delete.append({i: existing_files[i]})
            
            files_to_add = set(all_files).difference(set(file_paths))
            print(file_paths)
            print(files_to_add)

        else:
            files_to_update = []
            files_to_delete = []
            files_to_add = all_files

        return files_to_update, files_to_delete, files_to_add

    except Exception as e:
        print(f"Elasticsearch client error: {e}")


def extract_text(doc):
    ext = Path(doc).suffix

    if ext == ".md":
        with open(doc, 'r') as f:
            markdown_text = f.read()
        data = frontmatter.loads(markdown_text).to_dict()
        data["content"] = data["content"].replace("\n", " ")
        data = organize_md_metadata(data, doc)

    elif ext == ".pdf":
        with fitz.open(doc) as pages:
            data = pages.metadata
            texts = [page.get_text() for page in pages]
            data["content"] = ' '.join(texts).replace("\n", " ")
            data = organize_pdf_metadata(data, doc)

    return data


def organize_md_metadata(data, doc):
    new_data = dict()
    data_keys = data.keys()

    if "title" in data_keys:
        if data["title"]:
            new_data["title"] = data["title"]
        else:
            new_data["title"] = Path(doc).stem
    else:
        new_data["title"] = Path(doc).stem

    if "author" in data_keys:
        if data["author"]:
            new_data["author"] = data["author"]
        else:
            new_data["author"] = ""
    else:
        new_data["author"] = ""
    
    if "description" in data_keys:
        if data["description"]:
            new_data["description"] = data["description"]
        else:
            new_data["description"] = []
    else:
        new_data["description"] = []

    if "languages" in data_keys:
        if data["languages"]:
            new_data["languages"] = data["languages"]
        else:
            new_data["languages"] = []
    else:
        new_data["languages"] = []

    if "tags" in data_keys:
        if data["tags"]:
            new_data["tags"] = data["tags"]
        else:
            new_data["tags"] = []
    else:
        new_data["tags"] = []

    if "date_created" in data_keys:
        if data["date_created"] and isinstance(data["date_created"], datetime.datetime):
            date = data["date_created"]
            new_data["date_created"] = '%s-%s-%s' % (date.year, date.month, date.day)
        else:
            new_data["date_created"] = ""
    else:
        new_data["date_created"] = ""

    if "date_modified" in data_keys:
        if data["date_modified"] and isinstance(data["date_modified"], datetime.datetime):
            date = data["date_modified"]
            new_data["date_modified"] = '%s-%s-%s' % (date.year, date.month, date.day)
        else:
            new_data["date_modified"] = ""
    else:
        new_data["date_modified"] = ""

    new_data["file_path"] = doc
    new_data["hash"] = hash_document(doc)
    new_data["content"] = data["content"]
    new_data["file_type"] = Path(doc).suffix

    return new_data


def organize_pdf_metadata(data, doc):
    new_data = dict()
    data_keys = data.keys()

    if "title" in data_keys:
        if data["title"]:
            new_data["title"] = data["title"]
        else:
            new_data["title"] = Path(doc).stem
    else:
        new_data["title"] = Path(doc).stem

    if "author" in data_keys:
        new_data["author"] = data["author"]
    else:
        new_data["author"] = ""

    if "creationDate" in data_keys:
        if data["creationDate"]:
            date = data["creationDate"]
            new_data["date_created"] = "-".join([date[2:6], date[6:8], date[8:10]])
        else:
            new_data["date_created"] = ""
    else:
        new_data["date_created"] = ""

    if "modDate" in data_keys:
        if data["modDate"]:
            date = data["modDate"]
            new_data["date_modified"] = "-".join([date[2:6], date[6:8], date[8:10]])
        else:
            new_data["date_modified"] = ""
    else:
        new_data["date_modified"] = ""

    new_data["file_path"] = doc
    new_data["hash"] = hash_document(doc)
    new_data["content"] = data["content"]
    new_data["file_type"] = Path(doc).suffix

    return new_data