from base64 import encode
from unittest import result
from tqdm import tqdm # loading bar
import requests
import uuid
import time
import json
import pandas as pd

# APIGW Invoke URL
api_url = 'https://htacxyxwab.apigw.ntruss.com/custom/v1/19265/3afa64b3fd5507804c03d8feb7f9cdd58d892e02857b9d55f392552c8e63c090/general'

# Secret Key
secret_key = 'a0VwQWt2SHNGV0F6SmFreFpjcG9UWmNuWWRVS3RPank='
# CLOVA OCR Invoke URL
# http://clovaocr-api-kr.ncloud.com/external/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff

def call_ocr_api(image_file):
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
  #with open('ocr_text.txt', 'w') as result:
  #  for i in response.text:
  #    result.write(i)
  print(response.text)
  return response.text # json file

def parse_json(json_file): # ocr 결과를 필요한 정보만 파싱
  ocr_json = json.loads(json_file) # json Object
  ocr_array = ocr_json.get('images')[0].get('fields')
  text_list = []
  confidence_list = []
  for element in ocr_array:
    text_list.append(element.get('inferText'))
    confidence_list.append(element.get('inferConfidence'))
  infer_dict = {'inferText': text_list, 'inferConfidence': confidence_list}
  return infer_dict

def check_pill_db(ocr_dict, pill_db): # ocr 결과가 약 DB에 있는지 확인
  pill_df = pd.read_csv(pill_db)
  pill_name_list = pill_df['ITEM_NAME'].values 
  text_list = ocr_dict['inferText']
  confidence_list = ocr_dict['inferConfidence']
  first = 1
  for text, confidence in tqdm(zip(text_list, confidence_list)):
    if (confidence > 0.5) and (text in pill_name_list):# confidence가 0.5보다 높고 pill_db에 존재하는 text만 사용자 db에 저장한다.
      if first:
        df = pd.DataFrame(pill_df[pill_df['ITEM_NAME']==text])
        first = 0
      else:
        df.append(pill_df[pill_df['ITEM_NAME']==text])
      df.to_json('DB.json', indent = 4, force_ascii=False)
      Process_onDB()
      #write_onDB(pill_df[pill_df['itemName']==text])

def Process_onDB():
    with open('DB.json', 'r') as json_file:
      json_data = json.load(json_file)
      for i in json_data.keys():
        for k in json_data[i].keys():
          if type(json_data[i][k]) != int:
              json_data[i][k] = str(json_data[i][k]).replace("<", "")
              json_data[i][k] = str(json_data[i][k]).replace("<", "")
              json_data[i][k] = str(json_data[i][k]).replace(">", "")
              json_data[i][k] = str(json_data[i][k]).replace("p", "")
              json_data[i][k] = str(json_data[i][k]).replace("s", "")
              json_data[i][k] = str(json_data[i][k]).replace("/", "")
              json_data[i][k] = str(json_data[i][k]).replace("u", "")
              json_data[i][k] = str(json_data[i][k]).replace("b", "")
              json_data[i][k] = str(json_data[i][k]).replace("<p>", "")
      with open('result.json', 'w') as result:
          json.dump(json_data, result, indent = 4,  ensure_ascii = False)
    
  
def main(image_file, pill_db):
  json_file = call_ocr_api(image_file)
  infer_dict = parse_json(json_file)
  check_pill_db(infer_dict, pill_db)