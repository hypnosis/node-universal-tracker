# node-universal-tracker

Application for tracking goal popular counter such as Google Analytics and Yandex Metrika.

This service provides 1 pixel invisible gif image. You can insert this image to everywhere: email, blog, etc...


## Installation

```sh
$ git clone git@github.com:hypnosis/node-universal-tracker.git
$ node app.js
```

Visit your browser to `http://localhost:8080` or deploy this application to server (Heroku)


## Using


### Example using

`http://YOUR_DOMAIN/track.gif?yaparam[id]=YANDEX_METRIKA_ID&yaparam[reachGoal][target]=buy&yaparam[reachGoal][params][order]=perfect_body&gaparam[id]=UA-XXXXXXXX-1&gaparam[category]=action&gaparam[action]=buy&gaparam[label]=perfect_body`

### URL

`http://yourdomain/track.gif`

## YandexMetrika Params

### yaparam[id]

Yandex.Metrika ID

## yandexMetrikaXXXX.ReachGoal() (yaparam[reachGoal][...])

### yaparam[reachGoal][target]

Name of your goal in YandexMetrika (see Yandex.Metrika DOCS)

### yaparam[reachGoal][params][...]

Optional param name for your Yandex Metrika Goal

Ex: **yaparam[reachGoal][params][order]=perfect_body**

## Google Analytics Params

### gaparam[id]

Googla Analytics ID
UA_XXXXXXXX_1

### Google Analytics send Event ga.event(...) (gaparam[event][...])
Send ga.event('category','action'[,'label', 'value']) to Google Analytics

### gaparam[event][category]

Goals category

### gaparam[event][action]

Goals action

### gaparam[event][label]

Goals label

### gaparam[event][value]

Integer value for goal

