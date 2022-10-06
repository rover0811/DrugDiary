import requests
import uuid
import time
import json

# APIGW Invoke URL
api_url = 'https://8vhb9to58j.apigw.ntruss.com/custom/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff/general'
# Secret Key
secret_key = 'WllGYkRRb1VPTkN0Y3FhYkVLTVlMVlFFQXRXWWdjQWM='
# CLOVA OCR Invoke URL
# http://clovaocr-api-kr.ncloud.com/external/v1/18483/a614b583ca0ed9d541b5609697d1de6cc3229dc2f7001e17ed228e6453e39dff

image_file = 'images/pill.jpg'

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

print(response.text)

