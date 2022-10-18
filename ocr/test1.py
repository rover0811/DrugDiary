import json
from textwrap import indent
from hpack import Decoder

with open('DB.json', 'r') as json_file:
    json_data = json.load(json_file)
    for key, value in json_data.items():
        if value['0'] != None:
            value['0'] = value['0'].replace("<", "")
            value['0'] = value['0'].replace(">", "")
            value['0'] = value['0'].replace("p", "")
            value['0'] = value['0'].replace("s", "")
            value['0'] = value['0'].replace("/", "")
            value['0'] = value['0'].replace("u", "")
            value['0'] = value['0'].replace("b", "")
            print(value['0'])
    with open('../backend/result.json', 'w') as result:
        json.dump(json_data, result, indent = 4,  ensure_ascii = False)