import time
import numpy as np
import cv2

data = np.ndarray(shape=(2,3,4), dtype=int, buffer=np.array([1,2,3,4,5,6,7,8,9,10,11,12,11,11,11,11,13,33,44,55,66,77,88,55]))
print(data)

data2 = np.ndarray(shape=(2,3,4), dtype=int,buffer=np.array(data.flatten()))

print(data)



