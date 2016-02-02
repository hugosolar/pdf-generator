/*
	PDF generator 
	Receives requests from pix to print the scores to a PDF and return the url
	author: hugo.solar
*/
var express = require('express');
var bodyParser = require('body-parser');
var NodePDF = require('nodepdf');
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
	var width = req.body.score_width*2;
	var url = req.body.url;
	if (url != undefined) {
		var pdf = new NodePDF(url, 'download/'+name+'.pdf', {
		    'viewportSize': {
		        'width': 1440,
		        'height': 1200
		    },
		    'paperSize' : {
		    	'width': width+'px',
		    	'height': '1200px',
		    	'margin': '5px'
		    },
		    'zoomFactor': 0.5
		});
	}
	pdf.on('done', function(pathToFile){
	    console.log(pathToFile);
	    var pdf = {
	    	'status': 1,
	    	'return': name+'.pdf'
	    }
	    res.setHeader('Content-Type', 'application/json');
	    res.send( JSON.stringify(pdf) );
	});
	pdf.on('error', function(msg){
		var pdf = {
	    	'status': 0,
	    	'return': msg
	    }
	    res.setHeader('Content-Type', 'application/json');
	    res.send( JSON.stringify(pdf) );
	    console.log(msg);
	});
	pdf.on('stderr', function(stderr){
     	console.log(stderr);
	});
	pdf.on('stdout', function(stdout){
     	console.log(stdout);
	});
});
app.listen(process.env.PORT || 4730);
