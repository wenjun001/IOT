import requests
#r = requests.get('http://192.168.1.9/cm?cmnd=Power%20Off')
r = requests.get('http://192.168.1.9/cm?cmnd=Power%20on')
print r.text

