from gtts import gTTS
import os
text = "Hello deshan ma  you are a boy today is saturday"
tts = gTTS(text, lang='en')
tts.save("temp.mp3")
os.system("play temp.mp3")
os.system("rm temp.mp3")
