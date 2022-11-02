import requests
import json
import pandas as pd

url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList'
params ={'serviceKey' : 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ==', 'pageNo' : '1','numOfRows': '100', 'type' : 'json' }

def call_pill_api(pill_params): # 공공데이터포털 api 호출
    response_list = []
    for i in range(1,46):
        pill_params['pageNo'] = i
        response_list.append(requests.get(url, params=pill_params).text)
    return response_list

def preprocess(response_list): # json파일 전처리
    pill_json = []
    for response in response_list:
        response_json = json.loads(response)
        try:
            response_json = response_json["body"]["items"] # response json 중 items key
        except:
            continue
        pill_json += response_json
    df = pd.DataFrame(pill_json, columns=pill_json[0])
    df = df.drop(['itemSeq', 'openDe', 'updateDe', 'itemImage'], axis=1) # 필요없는 col 제거
    return df


    # pill_json = json.loads(json_file) # json Object
    # items_dict = pill_json["body"]["items"] # 리스트로 감싼 dict
    # df = pd.DataFrame(items_dict)
    # new_df = df.drop(['itemSeq', 'openDe', 'updateDe', 'itemImage'], axis=1) # 필요없는 col 제거
    # return new_df

def save_csv(df): # csv파일로 저장
    df.to_csv("pill.csv",  index=True)

if __name__ == '__main__': # import 시에는 실행되지 않음
    response_list = call_pill_api(params)
    df = preprocess(response_list)
    save_csv(df)