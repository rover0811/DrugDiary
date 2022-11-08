import requests
import pandas as pd
import json
import xml.etree.ElementTree as elemTree
url = 'http://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService02/getDrugPrdtPrmsnDtlInq01'
params ={'serviceKey' : '서비스키', 'pageNo' : '1', 'numOfRows' : '100', 'type' : 'json'}

params['serviceKey'] = 'PvrIUvAktOxd6AOTm2RPSs8ovw0vx517mITghrvn8+qD/IHJZQd4j+mjnD9nrT4/arMuTl44EGSvLLym15eBRQ=='

# 불필요한 열 제거
def drop(df):
    df = df.drop(['ITEM_SEQ', 'ITEM_PERMIT_DATE', 'CNSGN_MANUF', 'CHART', 'BAR_CODE', 'MATERIAL_NAME', 'INSERT_FILE', 'REEXAM_TARGET', 'REEXAM_DATE', 'PACK_UNIT', 'EDI_CODE', 'DOC_TEXT', 'PERMIT_KIND_NAME', 'ENTP_NO', 'MAKE_MATERIAL_FLAG', 'NEWDRUG_CLASS_NAME', 'INDUTY_TYPE', 'CANCEL_DATE', 'CANCEL_NAME', 'CHANGE_DATE', 'NARCOTIC_KIND_CODE', 'GBN_NAME', 'TOTAL_CONTENT', 'PN_DOC_DATA', 'MAIN_ITEM_INGR', 'INGR_NAME', 'ATC_CODE', 'EE_DOC_ID', 'UD_DOC_ID', 'NB_DOC_ID', 'VALID_TERM'], axis=1)
    return df

# 효능
def ee(ee_doc_data):
    try:
        root = elemTree.fromstring(ee_doc_data)
    except:
        return ee_doc_data
    data = {}
    val_list = []
    
    if root.find('SECTION').find('ARTICLE').find('PARAGRAPH') == None: # ARTCILE title only
        art = root.find('SECTION').findall('ARTICLE')
        for a in art:
            val_list.append(a.attrib['title'])
        data['-'] = val_list
    else:    
        art = root.find('SECTION').find('ARTICLE') # 첫 번째 ARTICLE만 
        for par in art.findall('PARAGRAPH'):
            val_list.append(par.text)
        if art.attrib['title'] != "": # ARTICLE title and PARAGRAPH text
            data[art.attrib['title']] = val_list
        else: # PARAGRAPH text only
            data['-'] = val_list
    return data
    
# 용법
def ud(ud_doc_data):
    try:
        root = elemTree.fromstring(ud_doc_data)
    except:
        return ud_doc_data
    try:
        par = root.find('SECTION').find('ARTICLE').findall('PARAGRAPH')       
    except:
        return ud_doc_data
    val = []
    for text in par:
        if text.text != '&nbsp;':
            val.append(text.text)
    return val

# 주의사항
def nb(nb_doc_data):
    try:
        root = elemTree.fromstring(nb_doc_data)
    except:
        return nb_doc_data
    val = {}
    for art in root.find('SECTION').findall('ARTICLE'):
        for par in art.findall('PARAGRAPH'):
            if art.attrib['title'] != "":
                val[art.attrib['title']] = par.text
    return val

response_list = []

# 이름 수정 (괄호 삭제)
def change_name(item_name):
    idx = item_name.find('(')
    if idx != -1:
        item_name = item_name[:idx]
    return item_name

# API 호출
def call_api():
    for i in range(1, 100):
        print(i)
        try:
            params['pageNo'] = i
            response_list.append(requests.get(url, params=params).content)
        except:
            continue
        
    pill_json = []
    for response in response_list:
        response_json = json.loads(response)
        try:
            response_json = response_json["body"]["items"]
        except:
            continue
        pill_json += response_json

    df = pd.DataFrame(pill_json, columns=pill_json[0]) 
    df = drop(df)

    df.to_csv("pill_db.csv", index=True)

# 전처리
def preprocess():
    df = pd.read_csv("pill_db.csv")
    for i in range(len(df)):
        df.at[i, 'EE_DOC_DATA'] = ee(df.loc[i, 'EE_DOC_DATA'])
        df.at[i, 'UD_DOC_DATA'] = ud(df.loc[i, 'UD_DOC_DATA'])
        df.at[i, 'NB_DOC_DATA'] = nb(df.loc[i, 'NB_DOC_DATA'])
        df.at[i, 'ITEM_NAME'] = change_name(df.loc[i, 'ITEM_NAME'])
    df.to_csv("pill_db_after_preprocessing.csv", index=True)


preprocess()