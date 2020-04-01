"""This example turns off all the NeoPixel LEDs."""
from adafruit_circuitplayground import cp
 
while True:
    cp.pixels.fill((0, 0, 0))
    