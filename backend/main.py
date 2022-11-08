from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi import UploadFile, File # image upload
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ocr import clova_ocr_api as ocr
app = FastAPI() # API 생성

@app.get('/ocr')
async def do_ocr():
    return ocr.main('../pill_2.jpg', '../ocr/pill_db_after_preprocessing.csv')

@app.get('/pill')
async def write_pill():
    return FileResponse('result.json')
    
@app.post('/image')
async def upload_image(file: UploadFile): # 클라이언트에서 file이라는 키값으로 이미지를 보내야 한다.
    return {"filename": file.filename}
