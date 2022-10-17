from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

import httpx # 외부 API 요청 라이브러리
import uuid
app = FastAPI() # API 생성

ocr_url = 'https://8vhb9to58j.apigw.ntruss.com/custom/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff/general'
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
} # ocr_params start
payload = {'message': json.dumps(request_json).encode('UTF-8')}
files = [
  ('file', open(image_file,'rb'))
]
headers = {
  'X-OCR-SECRET': secret_key
} # ocr_params end

pill_url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
pill_params = {'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==', 'pageNo' : '1', 'numOfRows' : '1', 'type' : 'json' }

# class Item(BaseModel): # 
#     text: str

@app.get("/pill_api/")
async def call_pill_api():
    async with httpx.AsyncClient() as client:
        response = await client.get(pill_url, params=pill_params) 
        data = response.text
        return data

@app.get("/ocr_api/")
async def call_ocr_api():
    async with httpx.AsyncClient() as client:
        response = await client.get(ocr_url, headers=headers, data=payload, files=files)
        data = response.text
        return data
    
# 터미널에 다음 코드 실행
# $ uvicorn main:app --reload