/*
 * Phantom JS script that generates a pdf from url
 * Author: hugo.solar
 */
var page = require('webpage').create(),
	system = require('system'),
    address, output, size;

var url = system.args[1];
var width = system.args[3];
var height = '1200px';
var name = system.args[2];

page.paperSize = { width: width, height: height, margin: '15px' }
page.zoomFactor = 0.7;

page.open(url, function() {
  page.render(name);
  phantom.exit();
});

page.onLoadFinished = function(status) {
  console.log('Status: ' + status);
};

page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

 console.error(msgStack.join('\n'));

};