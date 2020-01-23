var express = require ("express");
var app = express();
var bodyParser = require ("body-parser");


app.set("view engine" , "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	var campgrounds =[
		{name: "Salmon Creek", image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f0048261192519.5a66ad67252f2.jpg"}, 
	    {name: "Bear Den", image:"https://live.staticflickr.com/7168/6680364459_8db92d82ae_b.jpg"},
		{name: "Rabbit Hill", image:"https://live.staticflickr.com/89/249248726_74274d7fde.jpg"}
	]
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	
});

app.listen(3000, function(){
	console.log ("YelpCamp Up!")
});
