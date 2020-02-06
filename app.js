var express = require ("express");
var app = express();
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//var campgrounds =[
//		{name: "Salmon Creek", image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f0048261192519.5a66ad67252f2.jpg"}, 
//	    {name: "Bear Den", image:"https://live.staticflickr.com/7168/6680364459_8db92d82ae_b.jpg"},
//		{name: "Rabbit Hill", image:"https://live.staticflickr.com/89/249248726_74274d7fde.jpg"}
//	]
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name:String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create(
 // {
//	name: "Salmon Creek", 
 //   image:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f0048261192519.5a66ad67252f2.jpg"}
// function (err, campground){
//	if(err){
//		console.log(err);
//	} else{
//		console.log("Created Campground");
//		console.log (campground);
//	}
//  });

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({},function(err, allCampgrounds){
		if(err){
			console.log (err)
		}else{
			res.render("index", {campgrounds: allCampgrounds })
		}
	});
});

app.post("/campgrounds",function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, desciption:desc}
	// Create a new camopground and save
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
		  console.log(err);
	    }else{
			res.redirect ("/campgrounds");
		}
					  })
});

app.get ("/campgrounds/new", function(req, res){
	res.render("new");
})

//Show - shows more info about one campground
app.get ("/campgrounds/:id", function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log (err)
		}else{
			res.render("show", {campground: foundCampground});
		}
	});
	//render show template with that campground
});

app.listen(3000, function(){
	console.log ("YelpCamp Up!")
});
