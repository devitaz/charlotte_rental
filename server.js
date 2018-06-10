/////////////////////////////////////////////////////////////////////////////////////////////
//			Modules & Server Setup
/////////////////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var fs = require('fs');
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
var validator = require('express-validator');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var http = require('http');
var server = http.createServer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());

var express = require('express');
var path = require('path');
var body_parser = require('body-parser');
dotenv.load();

var generator = require('xoauth2').createXOAuth2Generator({
    user: process.env.GMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECTRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN
});
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
	auth: {
		xoauth2: generator	
    },
	tls: {
		rejectUnauthorized: false
	}
});


// GET Homepage
app.get('/', function(req, res, next){
	res.render('home', {
		isHome: "true"
	});
});
// GET Calendar Page
app.get('/calendar', function(req, res, next){
	res.render('calendar', {
		isCalendar: "true",
		page_title: "Reservation Calendar"
	});
});
// GET Photo Gallery Page
app.get('/gallery', function(req, res, next){
	res.render('gallery', {
		page_title: "Photo Gallery"
	});
});
// GET Contact Page
app.get('/contact', function(req, res, next){
	res.render('contact', {
		page_title: "Contact Us"
	});
});
// GET Customer Reviews Page
app.get('/reviews', function(req, res, next){
	res.render('reviews', {
		reviews: "true",
		page_title: "Customer Reviews"
	});
});
// GET About Page
app.get('/about', function(req, res, next){
	res.render('about', {
		isAboutUs: "true",
		page_title: "About Us"
	});
});
	
// POST Contact Page
app.post('/contact', function(req, res, next){
	var name = req.body.name;
	var phone = req.body.phone;
	var msg = req.body.msg;
	
	// data validation
	req.checkBody('name', 'Name field cannot be empty.').notEmpty();
	req.sanitize('name').trim();
	req.checkBody('name', 'Name must be between 3-30 characters long.').len(3, 30);
	req.checkBody('phone', 'Phone field cannot be empty.').notEmpty();
	req.sanitize('phone').trim();
	req.checkBody('phone', 'Phone number must be between 10-15 characters long.').len(10, 15);
	req.checkBody('msg', 'Message field cannot be empty.').notEmpty();
	msg.replace(/\\/g, "\\\\")
	   .replace(/\$/g, "\\$")
	   .replace(/'/g, "\\'")
	   .replace(/"/g, "\\\"")
	   .replace(/\./g, "\\.")
	   .replace(/\+/g, "&")
	   .replace(/\-/g, "to")
	   .replace(/\*/g, "x")
	   .replace(/\</g,"&lt;")
	   .replace(/\>/g,"&gt;")
	   .replace(/\|/g, "")
	   .replace(/\^/g, "");
	
	var options = {
		from: "rental@canby.com",
		to: process.env.GMAIL_USER,
		cc: "",
	    subject: "Canby Rental Inquiry",
	    text: name + "\n" + phone + "\n\n" + msg
	}

	if(req.validationErrors()) {
		res.end("error");
	}
	else {
		smtpTransport.sendMail(options, function(error, response) {
			if(error){
				console.log(error);
				res.end("error");
			} 
			else {
				res.end("sent");	
			}
			smtpTransport.close();
		});
		
	}
});

// Server Error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});
// Program Error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});