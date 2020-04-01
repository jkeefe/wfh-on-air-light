"""This example lights up all NeoPixel LEDs red in a fun pattern."""
from adafruit_circuitplayground import cp
import time
 
wait = 0.05
 
while True:
    
    for i in range(0 ,10):
        cp.pixels[i] = (50, 0, 0)
        time.sleep(wait)
        
    time.sleep(5)
    
    for i in range(0 ,10):
        cp.pixels[i] = (0, 0, 0)
        time.sleep(wait)

    