import requests
import json
import pandas as pd

url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
params ={'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==', 'pageNo' : '1', 'numOfRows' : '100', 'type' : 'json' }

response = requests.get(url, params=params)
contents = response.text

pill_json = json.loads(contents)

items_dict = pill_json["body"]["items"] # 리스트로 감싼 dict

df = pd.DataFrame(items_dict)

# df.to_csv("pill.csv",  index=False)

