import requests
import uuid
import time
import json
import pandas as pd

# APIGW Invoke URL
api_url = 'https://8vhb9to58j.apigw.ntruss.com/custom/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff/general'

# Secret Key
secret_key = 'WllGYkRRb1VPTkN0Y3FhYkVLTVlMVlFFQXRXWWdjQWM='
# CLOVA OCR Invoke URL
# http://clovaocr-api-kr.ncloud.com/external/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff

# ocr 대상 이미지
image_file = '../제목 없음.png'

# ocr api 코드
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

# ocr 결과를 DataFrame으로 저장
ocr_json = json.loads(response.text)
# fields = ocr_json["images"][0]['fields']
# df = pd.DataFrame(fields)                     
print(ocr_json)
# # 약 상세정보를 csv파일로 저장했을 때 실행 코드
# pill_df = pd.read_csv('pill.csv')
# for text in df['inferText'].values: 
#     if text in pill_df['itemName'].values:
#         print(pill_df[pill_df['itemName']==text])


# url_pill = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList' # 약 상세정보 api 주소

# for text in df['inferText'].values:
#   # ocr 결과 text를 약 상세정보 api 요청 파라미터로 전달
#   params_pill ={'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==', 'itemName' : text, 'type' : 'json' }
#   response = requests.get(url_pill, params=params)
#   pill_json = json.loads(response.text)
#   items_dict = pill_json["body"]["items"] # 리스트로 감싼 dict
  