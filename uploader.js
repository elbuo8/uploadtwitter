var Twitter = require('node-twitter');
var watch = require('watch');

var sharedFolder = '/Users/yamilasusta/Dropbox/Hackathon\ Photos/'
var status = 'more pictures! #hackpr'

var changed = false;

var twitterClient = new Twitter.RestClient(
    process.env.cKey,
    process.env.cSecretKey,
    process.env.aToken,
    process.env.aTokenSecret
);

watch.createMonitor(sharedFolder, function(monitor) {
   
   monitor.on("created", function(filename, stat) {
       if (!changed) {
           twitterClient.statusesUpdateWithMedia({"status": status, "media[]": filename}, function(error, result) {});
           changed = true;
       }
       else {
           changed = false;
       }
   });
});
