/*
	PDF generator 
	Receives requests from pix to print the scores to a PDF and return the url
	Compatible with phantomJS 2 (webfont support)
	Use Child process to execute Phantom
	TODO: error handling
	author: hugo.solar
*/
var express = require('express');
var bodyParser = require('body-parser');
var childProcess = require('child_process');
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//Add CORS header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Router
app.get('/', function(req, res){
	res.send('&>~/PiX/');
});
// get Download pdf
 app.get('/download/:pdfName', function(req, res){
 	res.setHeader('Content-disposition', 'attachment;filename='+req.params.pdfName);
    res.setHeader('Content-type', 'application/pdf');
    var file = __dirname + '/download/'+req.params.pdfName;
    console.log(file);
    res.download(file); 
 });
//Post /pdf
app.post('/pdf',function(req,res){
	var name = req.body.score_name;
	var width = req.body.score_width*1.5;
	var url = req.body.url;
	if (url != undefined) {

		var phantom = childProcess.exec('phantomjs web.js '+url+' download/'+name+'.pdf '+width, function(error, stdout, stderr) {
		        if ( error ) {
		                console.log(error.stack);
		                console.log('Error Stack: '+error.code);
		                console.log('Error signal: '+error.signal);
		                var pdf = {
					    	'status': 0,
					    	'return': 'Error code: '+error.code+' Error Signal: '+error.signal;
					    }
					    res.setHeader('Content-Type', 'application/json');
					    res.send( JSON.stringify(pdf) );
		        }
		        console.log('stdout: '+stdout);
		        console.log('sterr: '+stderr);
		});
		phantom.on('exit', function(data) {
		  console.log('child process exited with code '+data);
		   var pdf = {
		    	'status': 1,
		    	'return': name+'.pdf';
		    }
		    res.setHeader('Content-Type', 'application/json');
			res.send( JSON.stringify(pdf) );
		});
	}
});
app.listen(process.env.PORT || 4730);