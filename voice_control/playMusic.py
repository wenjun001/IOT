import snowboydecoder
from gtts import gTTS
import os
import datetime
import calendar
now = datetime.datetime.now()
def detected_callback():
    print "hotword detected"

    if calendar.day_name[now.weekday()] =='Monday':
        text = "Let's play chinese heart"
        tts = gTTS(text, lang='en')
        tts.save("temp.mp3")
        os.system("play temp.mp3")
        os.system("rm temp.mp3")
        os.system("play chinese_heart.mp3")



    if calendar.day_name[now.weekday()] =='Saturday':
        text = "Let's play happy"
        tts = gTTS(text, lang='en')
        tts.save("temp.mp3")
        os.system("play temp.mp3")
        os.system("rm temp.mp3")
        os.system("play happy.mp3")


    if calendar.day_name[now.weekday()] =='Sunday':
        text = "Let's play 10 thousands reasons"
        tts = gTTS(text, lang='en')
        tts.save("temp.mp3")
        os.system("play temp.mp3")
        os.system("rm temp.mp3")
        os.system("play 10000.mp3")
        os.system("cava")




detector = snowboydecoder.HotwordDetector("playMusic.pmdl", sensitivity=0.5, audio_gain=1)
detector.start(detected_callback)