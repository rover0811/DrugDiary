import pill_api as pill
from fastapi import FastAPI
# from typing import Union
# from pydantic import BaseModel
from fastapi.responses import FileResponse


from fastapi import UploadFile, File  # image upload
import uuid
import json,time,requests
from fastapi.encoders import jsonable_encoder
import base64

import os
# import sys
# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
# import clova_ocr_api as ocr_api

app = FastAPI(
    title='DETA Micros Test',
    description='Deta Micros test with FastAPI')


@app.get('/')
def FrontPage():
    return '복약 API ,명세는 현재 주소에 /docs를 붙여주세요.'




@app.get('/pill/input_name')
async def input_name(name: str):
    pill_list = pill.call_api(name)
    result = {}
    result["items"] = pill_list
    result = jsonable_encoder(result)
    return result

# @app.post('/pill/input_image')
# async def input_image(image: UploadFile):
#     UPLOAD_DIR = "./images"
#     if not os.path.exists(UPLOAD_DIR):
#         os.makedirs(UPLOAD_DIR)
#     content = await image.read()
#     filename = f"{str(uuid.uuid4())}.jpg"
#     with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
#         fp.write(content)

#     PATH = os.path.join(UPLOAD_DIR, filename)
#     ocr_response = ocr_api.call_api(PATH)
#     text_list = ocr_api.get_texts(ocr_response)

#     items = []
#     for text in text_list:
#         pill_list = pill.call_api(text)
#         if pill_list:
#             items += pill_list
            
#     result = {}
#     result['items'] = items
#     result = json.dumps(result, indent=4, ensure_ascii=False)

#     with open('result.json', 'w') as f:
#         f.write(result)
#     return FileResponse("result.json")

# @app.post('/pill/OCR')
# async def OCR(image: bytes = File()):
#     api_url = 'https://htacxyxwab.apigw.ntruss.com/custom/v1/19265/3afa64b3fd5507804c03d8feb7f9cdd58d892e02857b9d55f392552c8e63c090/general'
#     secret_key = 'a0VwQWt2SHNGV0F6SmFreFpjcG9UWmNuWWRVS3RPank='



#     request_json = {
#         'images': [
#             {
#                 'format': 'jpg',
#                 'name': 'demo'
#             }
#         ],
#         'requestId': str(uuid.uuid4()),
#         'version': 'V2',
#         'timestamp': int(round(time.time() * 1000))
#     }
#     payload = {'message': request_json}
#     files = [
#     ('file', image)
#     ]
#     headers = {
#     'X-OCR-SECRET': secret_key
#     }
    
#     response = requests.request("POST", api_url, headers=headers, data = payload, files = files)
#     # with open('response.json', 'w') as f:
#     #     f.write(response)
#     return response
    # a=response.json()

    # b=open('result.json','w+')
    # b.write(str(a))

