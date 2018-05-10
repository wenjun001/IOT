import snowboydecoder
import requests
def detected_callback():
    print "turn off"
    r = requests.get('http://192.168.1.9/cm?cmnd=Power%20Off')
    print r.text
detector = snowboydecoder.HotwordDetector("turnoff.pmdl", sensitivity=0.41, audio_gain=1)
detector.start(detected_callback)
