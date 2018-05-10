import snowboydecoder
import requests
def detected_callback():
    print "turn on"
    r = requests.get('http://192.168.1.9/cm?cmnd=Power%20on')
    print r.text
detector = snowboydecoder.HotwordDetector("turnon.pmdl", sensitivity=0.43, audio_gain=1)
detector.start(detected_callback)
