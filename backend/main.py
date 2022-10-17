from typing import Union
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pandas import array
from pydantic import BaseModel
import numpy as np

from fastapi.encoders import jsonable_encoder #data->json으로 바꿔줌
import httpx # 외부 API 요청 라이브러리
import uuid
import time
import json
app = FastAPI() # API 생성



# class Item(BaseModel): # 
#     text: str
pill_list = np.array

pill_url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
pill_params = {'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==','itemName' : '타이레놀', 'type' : 'json'}
@app.get("/pill_api/")
async def call_pill_api():
    async with httpx.AsyncClient() as client:
        response = await client.get(pill_url, params=pill_params) 
        data = response.text
        return jsonable_encoder(data)

ocr_url = 'https://8vhb9to58j.apigw.ntruss.com/custom/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff/general'
image_file = 'pills.jpeg' # ocr_params start
secret_key = 'WllGYkRRb1VPTkN0Y3FhYkVLTVlMVlFFQXRXWWdjQWM='
request_json = {
    'images': [
        {
            'format': 'jpg',
            'name': 'demo'
        }
    ],
    'requestId': str(uuid.uuid4()),
    'version': 'V2',
    'timestamp': int(round(time.time() * 1000))
} 
payload = {'message': json.dumps(request_json).encode('UTF-8')}
files = [
  ('file', open(image_file,'rb'))
]
headers = {
  'X-OCR-SECRET': secret_key
} # ocr_params end
@app.get("/ocr_api/")
async def call_ocr_api():
    async with httpx.AsyncClient() as client:
        response = await client.get(ocr_url, headers=headers, data=payload, files=files)
        data = response.text
        return data
    
# 터미널에 다음 코드 실행
# $ uvicorn main:app --reload