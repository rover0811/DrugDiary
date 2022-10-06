import requests
import json
import pprint

url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
params ={'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8%2BqD%2FIHJZQd4j%2BmjnD9nrT4%2FarMuTl44EGSvLLym15eBRQ%3D%3D', 'pageNo' : '1', 'numOfRows' : '10', 'type' : 'json' }

response = requests.get(url, params=params)
contents = response.text

pill_json = json.loads(contents)

# items = pill_json["body"]["items"]

# # item_name = []
# # for item in items:
# #     item_name.append(item["ITEM_NAME"])

# pp = pprint.PrettyPrinter(indent=4)
# # print(pp.pprint(items))
# print(len(items))

print(contents)