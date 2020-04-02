# wfh-on-air-light

Let my family know when my webcam is on.

## 



## Run with forever

I can make the program run "forever" using the [forever node module](https://github.com/foreversd/forever): 

```
sudo forever start index.js
```

And I stop it with:

```
sudo forever stopall
```

## Run with forever on startup

Roughly followed [these instructions](https://gistlog.co/milose/399e8ff3e7d03f658dfe) to get forever to start my program when my Mac powers up, which essentially means putting this line into my cron file, which I can edit with `crontab -e`.

```
@reboot /usr/local/bin/forever start /var/www/nodes/forever.json > /dev/null 2>&1
```

Mine is actually:

```
@reboot /Users/jkeefe/.nvm/versions/node/v11.4.0/bin/forever start /Users/jkeefe/Code/jkeefe-github/wfh-on-air-light/index.js > /dev/null 2>&1
```


