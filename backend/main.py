from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware #다른 protocol, ip adress, domain name, port에서 접근 가능하게 해주는 모듈

import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ocr import clova_ocr_api as ocr
app = FastAPI() # API 생성

origins = [
    "http://localhost:3000",
    "localhost:3000"
    "http://203.253.13.46:8000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
async def do_ocr():
    return ocr.main('../pill_ex.png', '../ocr/pill.csv')

@app.get('/pill')
async def write_pill():
    return FileResponse('result.json')

@app.post('/pillpost')
async def dis_ocr():
    return FileResponse('result.json')
