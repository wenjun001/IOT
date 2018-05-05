from gtts import gTTS
import os
text = "Hello Sunny"
tts = gTTS(text, lang='en')
tts.save("temp.mp3")
os.system("play temp.mp3")
os.system("rm temp.mp3")
