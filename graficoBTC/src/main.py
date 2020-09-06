import json
import requests
from datetime import datetime  
from datetime import timedelta 
data = []
for i in range(0,100):
    print(100-i)
    date = datetime.now() - timedelta(days=(100-i))
    url = "https://www.mercadobitcoin.net/api/BTC/day-summary/"+str(date.year)+"/"+str(date.month)+"/"+str(date.day)+"/"
    request = requests.get(url)
    request_json = json.loads(request.content)
    #print(request_json)
    data.append( request_json['avg_price'])

saving = " 'data' : [ "
for a in data:
    saving = saving + str(a) + ','

saving = saving +  ']'
print(saving)
f = open('data.json','r+')
f.write(saving)
f.close()
    