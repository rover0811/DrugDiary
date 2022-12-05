from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.encoders import jsonable_encoder
from fastapi import UploadFile, File  # image upload
from tempfile import NamedTemporaryFile
from typing import IO
import uuid
import json
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ocr import pill_api as pill
from ocr import clova_ocr_api as ocr
app = FastAPI()  # API 생성

@app.get('/pill/input_name')
async def input_name(name: str):
    pill_list = pill.call_api(name)
    result = {}
    result["items"] = pill_list
    result = jsonable_encoder(result)
    return result


async def temp_file(file: IO):
    with NamedTemporaryFile("wb", delete=False) as tempfile:
        tempfile.write(file.read())
        return tempfile.name
    
@app.post('/pill/input_image')
async def input_image(image: UploadFile):
    path = await temp_file(image.file)
    ocr_response = ocr.call_api(path)
    text_list = ocr.get_texts(ocr_response)
    items = []
    
    for text in text_list:
        if "mg" in text:
            if pill.call_api(text): pill_list = pill.call_api(text)
            elif pill.call_api(text.replace("mg", "밀리그램")): pill_list = pill.call_api(text.replace("mg", "밀리그램"))
            elif pill.call_api(text.replace("mg", "밀리그람")): pill_list = pill.call_api(text.replace("mg", "밀리그람"))
        else:
            pill_list = pill.call_api(text)
            
        if pill_list:
            items += pill_list
            
    result = {}
    result['items'] = items
    result = jsonable_encoder(result)
    return result
