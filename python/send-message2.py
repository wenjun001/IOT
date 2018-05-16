import lcm
import time
import numpy as np
import cv2
from exlcm import video_t

lc = lcm.LCM()

# msg = example_t()
# msg.timestamp = int(time.time() * 1000000)
# msg.position = (1, 2, 3)
# msg.orientation = (1, 0, 0, 0)
# msg.ranges = range(15)
# msg.num_ranges = len(msg.ranges)
# msg.name = "example string"
# msg.enabled = True

cap = cv2.VideoCapture(0)
frency = 0
while (True):
    # capture frame-by-frame
    ret, frame = cap.read()
    # print(ret)
    # print(type(frame))
    #print(frame.dtype) #uint8
    #print(frame.shape) # 480*640
    #print(frame.data)
    # data2 = np.ndarray(shape=(480,640,3), dtype=np.uint8,buffer=np.array(frame.flatten()))
    msg = video_t()
    msg.timestamp = int(time.time() * 1000000)
    # print(len(msg.stream))
    originalArray = frame.ravel()
    # for num in range(0,len(originalArray)):
    #     msg.stream[num] = originalArray[num]

    msg.stream= list(np.array(frame.flatten()))

    # temp = msg.encode()
    # msg2 = video_t.decode(temp)
 
    # c = np.array(msg2.stream).astype(np.uint8)
    # data3 = np.ndarray(shape=(480,640,3), dtype=np.uint8,buffer=np.array(c))
    
    cv2.imshow('frame', frame)
    frency = frency+1
    
    if frency == 4:
        lc.publish("VideoCapture", msg.encode())
        frency = 0

    if cv2.waitKey(1) & 0xFF == ord('q'):  
        break
    #time.sleep(1)

cap.release()
cv2.destroyAllWinowds()


