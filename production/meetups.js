
//location/radius hard coded, refactor later for function to take in loc
module.exports = (cb) => {
  const uuidv4 = require('uuid/v4');
  const request = require("request-promise");
  event = {};
  // events = [];
  request({
    uri: "https://api.meetup.com/find/events?&sign=true&photo-host=public&lon=-79.395197&radius=100&lat=43.644625&only=name,description,time,venue&key=3777c2327312a1c4f24937762c594c",
  }).then((data) => {

    JSON.parse(data).forEach((mu) => {
      if(mu.time && mu.venue && mu.venue.lat) {
        let timeToEvent = mu.time - Date.now()
        //currently no event meeting criteria.. extend time threshold for testing...
        //if within 30mins of event
        if (timeToEvent < 1800000) {
          event['type'] = 'Meet up';
          event['lat'] = mu.venue.lat;
          event['lng'] = mu.venue.lon;
          event['title'] = mu.name;
          event['time'] = mu.time;
          event['description'] = mu.description;
          event['id'] = uuidv4();
          event['priv'] = false;
          // events.push(event)
          cb(event);
        }

      }
    })
  });
};
