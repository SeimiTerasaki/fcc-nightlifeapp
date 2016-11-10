'use strict';

var User = require('../auth/models/user.js');
var Rsvp = require('../auth/models/rsvp.js');

function eventManager () {

       this.addLocation = function (req, res, next){
        var array = [].fill.call({ length: 15 }, []);
       User.findOneAndUpdate({'username': req.user.username},
       { $set: {'location': req.session.location,'events': array }},
       {upsert: true}, function(err, user){
        if(err){ throw err;
        } else {
          req.Location = user.location;
          next();
        }
      });
    };
    
    this.addRsvpLocation = function(req, res, next){
        var array = [].fill.call({ length: 15 }, []);
        Rsvp.update({'location': req.session.location},
        {$setOnInsert: { 'location': req.session.location,
        'rsvp': array }},{upsert: true},
		function(err, doc){
        if(err){ throw err;
        } else {
        req.Data = doc;
        next();
        }
      });
    };
    
    this.getRsvp = function (req, res, next){
        var date = new Date(Date.now() - 24*60*60 * 1000);
        console.log(date);
      Rsvp.findOneAndUpdate({'location': req.session.location},
      { $pull: { 'rsvp.$date': {"$lt":date} }},{returnNewDocument: true},
      function(err, doc){
        if(err){ throw err;
        } else {
        console.log(doc);
        req.Rsvp = doc;
        next();
        }
      });
    };

    this.addRsvp = function (req, res, next){
        var update = {};
        update['rsvp.'+req.params.index]= new Date();
    Rsvp.update ({'location': req.session.location},
      {$push: update }, {new: true}, function(err, doc){
          if (err) {
            throw err;
          } else {
          next();
            }
        });
      };
    
    this.removeRsvp = function (req, res, next){
         var update = {};
        update['rsvp.'+req.params.index]= -1;
     Rsvp.findOneAndUpdate ({'location': req.session.location},
      { $pop: update }, {new: true}, function(err, doc){
          if (err) {
            throw err;
          } else {
          next();
            }
        });
      };
      
      this.getEvents = function (req, res, next){
        var date = new Date(Date.now() - 24*60*60 * 1000);
        console.log(date);
      User.findOneAndUpdate({'username': req.user.username},
      { $pull: { 'events.$date': {"$lt":date} }},{returnNewDocument: true},
      function(err, doc){
        if(err){ throw err;
        } else {
        console.log(doc);
        req.Events = doc;
        next();
        }
      });
    };
      
      this.addEvents = function (req, res, next){
        var update = {};
        update['events.'+req.params.index]= new Date();
    User.update ({'username': req.user.username},
      {$push: update }, function(err, doc){
          if (err) {
            throw err;
          } else {
          null;
          }  
        });
      };
      
      this.removeEvents = function (req, res, next){
         var update = {};
        update['events.'+req.params.index]= -1;
     User.findOneAndUpdate ({'username': req.user.username},
      { $pop: update }, function(err, doc){
          if (err) {
            throw err;
          } else {
          null;
            }
        });
      };
    
    
}
module.exports = eventManager;