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

```
    http://YOUR_APP_DOMAIN/track.gif?yaparam[id]=YANDEX_METRIKA_ID&
      yaparam[reachGoal][target]=buy&
      yaparam[reachGoal][params][order]=perfect_body&
      yaparam[hit][url]=http://your.track.domain/buy&
      gaparam[id]=UA-XXXXXXXX-1&gaparam[event][category]=action&
      gaparam[event][action]=buy&gaparam[event][label]=perfect_body&
      gaparam[pageview][page]=/buy&gaparam[pageview][hostname]=http://your.track.domain/&
      gaparam[pageview][title]=thanks_for_buying
```

this example do:

 - yandexMetrikaXXXX.reachGoal('buy',{order: 'perfect_body'});
 - yandexMetrikaXXXX.hit('http://your.domain/buy');
 - ga('send','event','action','buy','perfect_body');
 - ga('send', 'pageview', '/buy', 'http://your.domain', 'thanks_for_buying');

### URL 

`http://yourdomain/track.gif`

## YandexMetrika Params

### yaparam[id] **required**

Yandex.Metrika ID

## yandexMetrikaXXXX.reachGoal(...) [DOCS](https://help.yandex.ru/metrika/objects/reachgoal.xml)

This params used for invoke `.reachGoal` method, to tell metrika, goal is reached.

### yaparam[reachGoal][target] **required**

Name of your goal in YandexMetrika (see Yandex.Metrika DOCS)

### yaparam[reachGoal][params][...]

Optional param name for your Yandex Metrika Goal

Ex: **yaparam[reachGoal][params][order]=perfect_body**

## yandexMetrikaXXXXX.hit(...) [DOCS](https://help.yandex.ru/metrika/objects/hit.xml)

This params used for invoke `.hit` method, to tell metrika, page is visited (hit)

### yaparam[hit][url] **required**

Full url with hostname page you want to track

### yaparam[hit][title]

Optional param title for your Yandex Metrika hit (default '')

### yaparam[hit][referer]

Optional param referer for your Yandex Metrika hit (default uses url params)


## Google Analytics Params

### gaparam[id] **required**

Googla Analytics ID
UA_XXXXXXXX_1

## Google Analytics send event ga('send','event', ...) [DOCS](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

Send ga.event('category','action'[,'label', 'value']) to Google Analytics

### gaparam[event][category] **required**

Goals category

### gaparam[event][action] **required**

Goals action

### gaparam[event][label]

Goals label

### gaparam[event][value]

Integer value for goal

## Google Analytics send pageview ga('send','pageview', ...) [DOCS](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages)

### gaparam[pageview][page] **required**

Track page visit in your domain (hostname)

ex: `/buy.html`

### gaparam[pageview][hostname] **required**

Host name param used for invoke Analytics send method correctly

ex: `http://your.domain`

### gaparam[pageview][title] 

Optional title param to track in Google analytics statistic
