from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ocr import clova_ocr_api as ocr
app = FastAPI() # API 생성

@app.get('/')
async def do_ocr():
    return ocr.main('../memo.png', '../ocr/pill.csv')
