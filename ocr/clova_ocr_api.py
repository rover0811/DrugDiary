from base64 import encode
from unittest import result
from tqdm import tqdm # loading bar
import requests
import uuid
import time
import json
import pandas as pd


# APIGW Invoke URL (yehun)
# api_url = 'https://8vhb9to58j.apigw.ntruss.com/custom/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff/general'
# Secret Key
# secret_key = 'WllGYkRRb1VPTkN0Y3FhYkVLTVlMVlFFQXRXWWdjQWM='

# # APIGW Invoke URL (haun)
api_url = 'https://htacxyxwab.apigw.ntruss.com/custom/v1/19265/3afa64b3fd5507804c03d8feb7f9cdd58d892e02857b9d55f392552c8e63c090/general' # haun
# Secret Key
secret_key = 'a0VwQWt2SHNGV0F6SmFreFpjcG9UWmNuWWRVS3RPank='


# CLOVA OCR Invoke URL
# http://clovaocr-api-kr.ncloud.com/external/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff

def call_api(image_file):
  print("OCR start")# naver clova api 호출
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
  } 
  response = requests.request("POST", api_url, headers=headers, data = payload, files = files)
  return response.text

def get_texts(response): # ocr 결과를 필요한 정보만 파싱
  response_json = json.loads(response)
  fields = response_json.get('images')[0].get('fields')

  text_list = []
  for element in fields:
    text = element.get('inferText')
    if text.find(" ") == -1:
      text_list.append(text)
  return text_list

# if __name__ == "__main__":