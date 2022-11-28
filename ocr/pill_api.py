import requests
import json
import pandas as pd
import re

def clean(string):
    clean = re.compile('<.*?>')
    cleantext = re.sub(clean, '', string)
    cleantext = re.sub('\n', "", cleantext)
    cleantext = re.sub("[.]", ". ", cleantext)
    return cleantext

def call_api(name): # 공공데이터포털 api 호출
    url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
    params ={'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==', 'itemName': name, 'type' : 'json' }

    pill_list = []
    response = requests.get(url, params).text
    response_json = json.loads(response)
    try:
        items = response_json["body"]["items"] # response json 중 items key
        for item in items:
            for key in item.keys():
                try:
                    if key == "itemImage":
                        item[key] = item[key].lower()
                    else:
                        item[key] = clean(item[key])
                except:
                    continue
            pill_list.append(item)
    except:
        return
        
    return pill_list

# if __name__ == '__main__':