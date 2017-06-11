// flightplan.js
var plan = require('flightplan');

// configuration
plan.target('testing', {
  host: '192.168.0.10', // put your raspberry pi's IP address here
  username: 'pi',
  agent: process.env.SSH_AUTH_SOCK
});

// plan.target('production', []) // fill this out when you're ready for production

var remoteCodeDir = "/home/pi/code/elm-pi"

// run commands on localhost
plan.local(function(local) {
  local.exec('bash scripts/build.sh');

  // rsync files to all the target's remote hosts
  var filesToCopy = ["build/main.js", "build/elm.js"];
  local.transfer(filesToCopy, remoteCodeDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log('Log from remote');
  remote.with(`cd ${remoteCodeDir}/build`, function() {
    remote.exec('node main.js');
  });
});
