from base64 import encode
from unittest import result
from tqdm import tqdm # loading bar
import requests
import uuid
import time
import json
import itertools
import pandas as pd
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

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
  itemList = pd.read_csv("../ocr/itemName.csv")
  itemList = list(itertools.chain(*itemList.values))
  result = []
  for text in text_list:
    idx = text.find('[')
    if idx != -1:
      text = text[:idx]
    for item in itemList:
      matched = item.startswith(text)
      if matched and (len(text) >= 2):
        result.append(text)
        break
  result = list(set(result))
  return result
