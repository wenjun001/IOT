import lcm
import time
import numpy as np
import cv2
from exlcm import example_t

lc = lcm.LCM()

msg = example_t()
msg.timestamp = int(time.time() * 1000000)
msg.position = (1, 2, 3)
msg.orientation = (1, 0, 0, 0)
msg.ranges = range(15)
msg.num_ranges = len(msg.ranges)
msg.name = "example string"
msg.enabled = True

cap = cv2.VideoCapture(0)
while (True):
    # capture frame-by-frame
    ret, frame = cap.read()

    # our operation on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # display the resulting frame
    cv2.imshow('frame', gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWinowds()

lc.publish("EXAMPLE", msg.encode())
