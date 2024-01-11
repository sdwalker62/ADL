from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pathlib import Path
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/api/doc/{doc_path:path}")
async def retrieve_document(doc_path: str):
    file_path = Path(doc_path)
    file_name = file_path.stem + file_path.suffix
    return FileResponse(
        "/" + doc_path, media_type="application/pdf", filename=file_name
    )


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
