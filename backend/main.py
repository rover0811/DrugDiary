from ocr import pill_api as pill
from ocr import clova_ocr_api as ocr
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse

from fastapi import UploadFile, File  # image upload
import uuid
import json
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
app = FastAPI()  # API 생성


@app.get('/input_name')
async def input_name(name: str):
    response = {}
    response["items"] = pill.call_api(name)
    return response


@app.post('/input_image')
async def input_image(image: UploadFile):
    UPLOAD_DIR = "./images"
    content = await image.read()
    filename = f"{str(uuid.uuid4())}.jpg"
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)

    PATH = os.path.join(UPLOAD_DIR, filename)
    ocr_response = ocr.call_api(PATH)
    text_list = ocr.get_texts(ocr_response)

    items = []
    for text in text_list:
        pill_list = pill.call_api(text)
        if pill_list:
            items += pill_list
    response = {}
    response['items'] = items
    return response
