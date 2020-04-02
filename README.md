# Work-from-home "On Air" light

This code monitors whether my MacBook Air's iSight camera is on (most likely because I'm on a video call) and lets the folks around me know by lighting up a [Circuit Playground Express](https://www.adafruit.com/product/3333) with occasionally-spinning red lights(!)

The code runs on Node, and uses CircuitPython for the fun lights.

Here's how I got it to work:

## Is my laptop camera on?

There's a nifty node module called [node-camera-is-on](https://github.com/sindresorhus/node-is-camera-on) which makes it simple to check!

## Do something pretty

I've been playing with the [Circuit Playground Express](https://www.adafruit.com/product/3333) from Adafruit, which allows me to do some pretty simple Python programming to use its sensors, LEDs, etc.

First I needed to [update the CircuitPython library](https://learn.adafruit.com/welcome-to-circuitpython/installing-circuitpython), which is super easy.

Next, the [Circuit Playground Library](https://learn.adafruit.com/circuitpython-made-easy-on-circuit-playground-express/circuit-playground-express-library) walkthrough is the place to play.

The cool thing is that the Circuit Playground Express plugs into my USB port, shows up as a drive on my Mac, and reloads its code whenever I update `code.py` on the device. So I can change what it does just by copying different files to `/Volumes/CIRCUITPY/code.py`.

I have two Python files – `lights_off.py` and `lights_on.py` – in the `circuitpython` directory of this project, and those get copied over to the Circuit Playground Express depending on whether I want the lights on or off. Neato, eh?

## Using this repository

So that's what's going on. The main file is `index.js`, which checks the camera status every 5 seconds and copies over files whenever the state of the camera changes.

`index.js` is written in Node, because that's the language the camera-detecting script is written in. I've had Node on my computer for years ... but if you don't, you can [learn about installing Node](https://medium.com/@Joachim8675309/installing-node-js-with-nvm-4dc469c977d9) using `nvm` (a way to manage versions of Node), which will also install `npm` (the way to manage Node packages, such as [node-camera-is-on](https://github.com/sindresorhus/node-is-camera-on).

If you'd like to use it yourself, and have Node on your computer, be my guest. Here's how:

- Download or clone this repository
- Change directories into the project directory, probably called `wfh-on-air-light`
- Run `npm install` to load in the node dependencies.
- Change line #3 in the `index.js` file to be the full path to the project directory. You can get this by going into the directory and typing `pwd`.

## Runing the code

I can run the program using:

```
node index.js
```

I can also make the program run "forever" by installing the [forever program](https://github.com/foreversd/forever): 

```
sudo forever start index.js
```

If necessary, I stop it with:

```
sudo forever stopall
```

## Run with "forever" on startup

I want this running whenever I'm using my Mac, and without thinking about it, which means launching it on startup. That means adding something to my cron file.

Getting this working was a little tricky. But some trial-and-error editing my [crontab](http://hints.macworld.com/article.php?story=20041105070509783), I finally added a `@reboot` line to the last line in the file. The format was `@reboot <path-to-node> <path-to-forever> start <path-to-index.js> > <path-to-log-file>`. So my final version, given my user name and node locations, ended up as:

```
@reboot /Users/jkeefe/.nvm/versions/node/v11.4.0/bin/node /Users/jkeefe/.nvm/versions/node/v11.4.0/bin/forever start /Users/jkeefe/Code/jkeefe-github/wfh-on-air-light/index.js > /Users/jkeefe/Code/jkeefe-github/wfh-on-air-light/cron.log
```

Obviously, your user name and paths will be different.

    
