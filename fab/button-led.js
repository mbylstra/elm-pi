var Gpio = require('onoff').Gpio;
// var led = new Gpio(14, 'out');
var button1 = new Gpio(17, 'in', 'both');
var button2 = new Gpio(21, 'in', 'both');
//var button = new Gpio(4, 'in');


var player = require('play-sound')(opts = {});

console.log('run from fab');


button1.watch(
  function (err, value) {
    console.log("button 1 pressed: ", value);
    if (err) {
      throw err;
    }
    // led.writeSync(value);
    // led.writeSync(1);
    if (value == 1) {
    	player.play('bird.mp3', function(err) {
    	    if (err) throw err;
    	});
    }
  }
);


button2.watch(function (err, value) {
  console.log("button 2 pressed: ", value);
    if (value == 1) {
    	player.play('bird2.mp3', function(err) {
    	    if (err) throw err;
    	});
    }
});

function exitHandler(options, err) {
  console.log('exiting...');
  // led.writeSync(0);
  // led.unexport();
  button1.unexport();
  button2.unexport();

  if (options.cleanup) console.log('clean');
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
