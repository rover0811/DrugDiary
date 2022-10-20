import pandas as pd

df = pd.read_csv('pill.csv')

a = df['itemName']

print(type(a))