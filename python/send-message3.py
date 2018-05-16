import lcm
import time

from exlcm import buffer_t

lc = lcm.LCM()

msg = buffer_t()
msg.encode("aaabbbccc")

lc.publish("EXAMPLE", msg.encode())
