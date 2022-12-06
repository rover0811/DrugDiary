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
    # if "mg" in name:
    #         if pill.call_api(text): pill_list = pill.call_api(text)
    #         elif pill.call_api(text.replace("mg", "밀리그램")): pill_list = pill.call_api(text.replace("mg", "밀리그램"))
    #         elif pill.call_api(text.replace("mg", "밀리그람")): pill_list = pill.call_api(text.replace("mg", "밀리그람"))
         
    url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
    params ={'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==', 'itemName': name, 'type' : 'json' }
    
    if "mg" in name:
        response = requests.get(url, params).text
        response_json = json.loads(response)
        if response_json["body"]["totalCount"] != 0: pass
        else:
            params["itemName"] = name.replace("mg", "밀리그램")
            response = requests.get(url, params).text
            response_json = json.loads(response)
            if response_json["body"]["totalCount"] != 0: pass
            else:
                params["itemName"] = name.replace("mg", "밀리그람")
                response = requests.get(url, params).text
                response_json = json.loads(response)
    else:
        response = requests.get(url, params).text
        response_json = json.loads(response)
        
    pill_list = []
    try:
        items = response_json["body"]["items"] # response json 중 items key
        for item in items:
            for key in item.keys():
                try:
                    if key == "itemName":
                        if "밀리그램" in item[key]:
                            item[key] = item[key].replace("밀리그램", "mg")
                        elif "밀리그람" in item[key]:
                            item[key] = item[key].replace("밀리그람", "mg")
        
                    if key == "itemImage":
                        changed = "ITEMIMAGEDOWNLOAD"
                        idx = item[key].find(changed)
                        idx = idx + len(changed)
                        temp = item[key][idx:]
                        item[key] = item[key].lower()
                        item[key] = item[key].replace("itemimagedownload", "itemImageDownload")
                        item[key] = item[key].replace(item[key][idx:], temp)
                    else:
                        item[key] = clean(item[key])
                        
                except:
                    continue
            pill_list.append(item)
    except:
        return
        
    return pill_list

if __name__ == '__main__':
    call_api("rksekkfk")