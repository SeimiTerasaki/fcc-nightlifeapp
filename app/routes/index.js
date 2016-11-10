var express = require('express');
var router = express.Router();

var passportGithub = require('../auth/github');
var Foursquare = require('foursquare-venues');
var foursquare = new Foursquare(process.env.Client_Id, process.env.Client_Secret);

var path = process.cwd();
var EventManager = require(path + '/app/controllers/eventManager.js');

  function isLoggedIn (req, res, next) {
  	if (req.isAuthenticated()) {
  		return next();
  	} else {
  	  console.log("failed to log in!");
  	  next();
  	}
  }
  
  function getUserData(req, res, next){
    foursquare.exploreVenues({
        near: req.session.location,
        limit: 15,
        query: 'Nightlife',
        venuePhotos: 1
    }, function(error, response) {
        if (error) throw error;
        else{
        req.Data = response;
        next();
        }
    })
  }

var eventManager = new EventManager();

router.get('/', function(req, res) {
  res.render('index', {
      Data:'undefined'
  });
});

router.get('/login', isLoggedIn, eventManager.addLocation,eventManager.addRsvpLocation,
eventManager.getRsvp, eventManager.getEvents, getUserData, function(req, res){
    res.render('index', {
        Data: req.Data,
        Rsvp: req.Rsvp,
        Events: req.Events
    });
});

router.get('/search/:query(*)', function(req, res){
     req.session.location = req.params.query;
    foursquare.exploreVenues({
        near: req.params.query,
        limit: 15,
        query: 'Nightlife',
        venuePhotos: 1
    }, function(error, response) {
        if (error) console.log("Sorry, we could not find any results for your location.");
        else{
        res.json(response);
        }
    })
});

router.get('/auth/github', passportGithub.authenticate('github'));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', {
    successRedirect: '/login',
    failureRedirect: '/'
  }));

router.get('/going/:index(*)', eventManager.addRsvp, eventManager.addEvents);

router.get('/remove/:index(*)', eventManager.removeRsvp, eventManager.removeEvents);

module.exports = router;
