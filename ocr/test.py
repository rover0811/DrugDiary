import json
import pandas as pd

pill_df = pd.read_csv('pill.csv')

text = '{"version":"V2","requestId":"cb29c07d-0ded-4873-9527-75f2e806faeb","timestamp":1665583554716,"images":[{"uid":"34681fe1d66b4a388a2489c8b704e6bf","name":"demo","inferResult":"SUCCESS","message":"SUCCESS","validationResult":{"result":"NO_REQUESTED"},"convertedImageInfo":{"width":1536,"height":864,"pageIndex":0,"longImage":false},"fields":[{"valueType":"ALL","boundingPoly":{"vertices":[{"x":4.0,"y":5.0},{"x":64.0,"y":5.0},{"x":64.0,"y":27.0},{"x":4.0,"y":27.0}]},"inferText":"파일(F)","inferConfidence":1.0,"type":"NORMAL","lineBreak":false},{"valueType":"ALL","boundingPoly":{"vertices":[{"x":74.0,"y":5.0},{"x":133.0,"y":5.0},{"x":133.0,"y":29.0},{"x":74.0,"y":29.0}]},"inferText":"편집(E)","inferConfidence":1.0,"type":"NORMAL","lineBreak":false},{"valueType":"ALL","boundingPoly":{"vertices":[{"x":144.0,"y":5.0},{"x":207.0,"y":5.0},{"x":207.0,"y":29.0},{"x":144.0,"y":29.0}]},"inferText":"서식(O)","inferConfidence":0.981,"type":"NORMAL","lineBreak":false},{"valueType":"ALL","boundingPoly":{"vertices":[{"x":218.0,"y":5.0},{"x":277.0,"y":5.0},{"x":277.0,"y":29.0},{"x":218.0,"y":29.0}]},"inferText":"보기(V)","inferConfidence":0.9999,"type":"NORMAL","lineBreak":false},{"valueType":"ALL","boundingPoly":{"vertices":[{"x":288.0,"y":5.0},{"x":369.0,"y":5.0},{"x":369.0,"y":27.0},{"x":288.0,"y":27.0}]},"inferText":"도움말(H)","inferConfidence":0.9999,"type":"NORMAL","lineBreak":true},{"valueType":"ALL","boundingPoly":{"vertices":[{"x":4.0,"y":32.0},{"x":81.0,"y":32.0},{"x":81.0,"y":63.0},{"x":4.0,"y":63.0}]},"inferText":"활명수","inferConfidence":0.9995,"type":"NORMAL","lineBreak":true}]}]}'

ocr_json = json.loads(text)

items_dict = ocr_json["images"][0]['fields']

# print(items_dict)

df = pd.DataFrame(items_dict)

for text in df['inferText'].values:
    if text in pill_df['itemName'].values:
        print(pill_df[pill_df['itemName']==text])

