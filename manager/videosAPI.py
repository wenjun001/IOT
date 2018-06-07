from pymongo import *
import json
client = MongoClient("mongodb://localhost:27017/")
db = client.media
collection = db.video_info
# print(collection.count())
res = []
for video_info in collection.find({},{ "video_id":1,"video_rtsp": 1, "video_name": 1 ,"video_name":1,"_id":0}):
	print(video_info['video_id'])
	print(video_info['video_rtsp'])
	
	# res.append(video_info)

# pythonDictionary = {'res':res}
# dictionaryToJson = json.dumps(pythonDictionary)
# print(pythonDictionary)