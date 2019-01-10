//Hard coded inital Locations
var ourLocations = [{
    name: "Emporium Mall",
    address: "Abdul Haque Rd, Trade Centre Commercial Area Phase 2 Johar Town, Lahore, Punjab",
	description: "Emporium Mall is a shopping mall located in Johar Town, Lahore southwest of Lahore International Expo Centre. The 11-storey mall is spread over 1.8 million square feet and is home to over 200 stores and a five-star hotel. Opened in 2016, it is the second largest mall in Pakistan after the Lucky One Mall in Karachi, and also one of the largest shopping malls of the world by gross leasable area.[1] The Mall is managed by the Nishat Group. According to the mall's website, their daily estimated visitors are 44 thousand people.",
    latlng: {
		lat: 31.4672,
        lng:  74.2659,
	},
	icon: "Mall",
	url: "http://nishatemporium.com/",
	wiki: "https://en.wikipedia.org/wiki/Emporium_Mall" 
  }, {
    name: "Nando's Restaurant",
    address: "Nando's, Plot No. 13, Street 17, Sector Z Commercial 3 DHA Lahore Cantt، Lahore, Punjab",
    description: "Nando's is an international casual dining restaurant chain originating in South Africa.[1] Founded in 1987, Nando's operates over 1,000 outlets in 35 countries. The logo is based on the Rooster of Barcelos. Nando's specialises in Portuguese style chicken dishes with various peri-peri marinades.[2]",
    latlng: {
		lat: 31.475032,
        lng: 74.378568,
    },
	icon: "Restaurant",
	url: "https://www.nandospakistan.com/eat/menu"
  }, {
    name: "Packages Mall",
    address: "Shop G-016, Packages Mall، Walton Road, Lahore, Punjab",
    description: "A mall in Lahore",
    latlng: {
		lat: 31.4714,
        lng: 74.3556,
    },
	icon: "Mall",
	url: "https://www.facebook.com/PackagesMall/"
  }, {
    name: "Forstress Square Mall",
    address: "Fortress Stadium، Mian Mir Bridge, Saddar Town, Lahore, Punjab",
    description: "Fortress Square is a five-storey shopping mall and an entertainment complex located in Lahore Cantonment, Punjab, west of Fortress Cricket Stadium, and south of Hyperstar by Carrefour and Sozo World. The mall is home to over 100 local and international stores, a food court and a cinema.",
    latlng: {
		lat: 31.5324,
        lng: 74.3631
    },
	icon: "Mall",
	url: "http://fortresssquare.com/"
  }, {
    name: "Liberty Market",
    address: "Gulberg III, Lahore, Punjab",
    description: "A very Famous market in Lahore.",
    latlng: {
		lat: 31.5106,
        lng: 74.3445,
    },
	icon: "Market",
	url: "https://www.facebook.com/pages/category/Public---Government-Service/Liberty-Market-Lahore-128835887220256/"
  }, {
    name: "Badshahi Mosque",
    address: "Walled City, Lahore, Punjab",
    description: "The Badshahi Mosque is a Mughal era masjid in Lahore, capital of the Pakistani province of Punjab, Pakistan. The mosque is located west of Lahore Fort along the outskirts of the Walled City of Lahore, and is widely considered to be one of Lahore's most iconic landmarks.",
    latlng: {
		lat: 31.5880,
        lng: 74.3107,
    },
	icon: "Monument",
	url: "https://en.wikipedia.org/wiki/Badshahi_Mosque"
  }, {
    name: "Tuscany Coutyard Lahore",
    address: "5 M. M. Alam Road Gulberg، Block T Gulberg 2, Lahore, Punjab",
    description: "Elite restaurant.",
    latlng: {
		lat: 31.519794,
        lng: 74.351509,
	},
	icon: "Restaurant",
	url: "https://www.facebook.com/TuscanyCourtyardLahore/"
  }, {
    name: "Howdy Restaurant",
    address: "7 R3, Johar Town، Near Shaukat Khanum Hospital Road, Block R 3 Phase 2 Lahore, Punjab",
    description: "Serve good burgers",
    latlng: {
		lat: 31.450040,
        lng: 74.270957,
    },
	icon: "Restaurant",
	url: "https://www.facebook.com/HowdyMMAlam"
  }, {
    name: "Gaddafi Stadium",
    address: "Pakistan Cricket Board, Hafeez Kardar Rd, Block E 2 Gulberg III, Lahore, Punjab",
    description: "Gaddafi Stadium is a cricket ground in Lahore, Pakistan. It was designed by famous architect and engineer Nasreddin Murat-Khan, and constructed by Mian Abdul Khaliq and Company in 1959. The stadium was renovated for the 1996 Cricket World Cup when it hosted the final.",
    latlng: {
		lat: 31.513126,
        lng: 74.333416
    },
	icon: "Stadium",
	url: "http://www.pcb.com.pk/event.html?tag=Gaddafi%20Stadium"
  }
];

//String to display in info window
var displayInfo;

var map;
var infoWindow;
var marker;

//Create Instance of a map from the Google maps api
//Grab the reference to the "map" id to display map
//Set the map options object properties 
///*
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: {
			lat: 31.4672,
        	lng:  74.2659,
		},
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
			mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	});
};//*/

/*
function initMap() {} // now it IS a function and it is in global
	$(() => {
		initMap = function() {
			// your code like...
			map = new google.maps.Map(document.getElementById("map"), {
				center: {
					lat: 31.4672,
        			lng: 74.2659
				},
					zoom: 13,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: true,
					mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
				}
			});
			// and other stuff...
		}
	})
//*/

// tells the view model what to do when a change occurs
function gymLocation(value) {
	this.name = ko.observable(value.name);
	this.address = ko.observable(value.address);
	this.description = ko.observable(value.description);
	this.latlng = ko.observable(value.lat);
};

var prevInfoWindow;

function appViewModel() {

	var self = this;
	self.markers = [];

	self.sortedLocations = ko.observableArray(ourLocations);

	self.sortedLocations().forEach(function(location) {
		marker = new google.maps.Marker({
			position: location.latlng,
			map: map,
			title: location.name,
			icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKkSURBVGhD7dpL6A1hHMbx41oiUQhFNooiLBQbKyXZyE5IJEkWYkUsiPoXC5fcQlm6hBWllKQohY2dsEFy2bjf+T6LU2/Tc86ZOed958yUpz47M+/v9Z55LzP/RoKMwDLsxEmcwynsw0qMQ6WzFFfwGX/b+IXb2IihqEzm4xZc0Z08wQr0PVvwE67IIs5gOErPIByHK6pbdzAGpUYPriumVzcxBKVEM88fuEJiOILk0dC/hysgFv0nLUTSDMA1Hpuel2QZiy9wDWe9wW5oap6CWdiEx3D/3lmMJFkN12DWdYyGy2Dsh7suS7uCJLkE12DoHvKsB4fgrg+9hDoePe/gGgzNRZ6MxGu4e4RmImq00XMNhR6gSA7D3Se0HFEzHa6h0FkUyTq4+4TWI2rydKTow6mF1d0nFL0jmoVcQ6EbKBJNz+4+oSWIHm25XWNN35D30KRN5yO4+zT9htau6DkN12DoBPJkFdz1obtIEg2zazBrG9plETqdImUDkmQYXsE1mnUV8xBmKg7iB9w1oY8YhWTZC9dwK1r0HuI5imz99TNOmkn4Ctd4LOrwbCTPMbgCYrmMUqJt+Xe4Inql0ZiD0qIXbq6QXmmSKDXTEHtUNBrZma6UHIUrqFvn0ZdMwAe4oorSSz5tTPuWPXCFFZV83egU7YrfwhWXl9YlzYR9z3a4AvPSSbES0feQF3BFdqLN40RUJpvhCu3kACoVvQJ6BldsK9rhjkflovO1K7iVyo1GMxqVvOcVrRs6n1Q2u+AKz7qASkefHfTbd8WHFqDy0YcaV3yT3g/XIjPgOtC0BrXJfbhOfIJeYNcmW+E60reterdp9fNai9rFrfSTUbtcRNgJfYGqZfTXQWFHrqGW0fMQdqTvp8Buo8/LTwM78D/t02j8A5eq+1w+pl4sAAAAAElFTkSuQmCC',
			animation: google.maps.Animation.DROP
		});

		location.marker = marker;

		this.markers.push(marker);
	});

	self.markers.map(function(info) {
		info.addListener('click', function() {
			
			var dataItem;

			var i;
			for (i = 0; i < ourLocations.length; i++) {
				if (ourLocations[i]['name'] == info.title) {
					dataItem = i;
				}
			}

			if (prevInfoWindow){
				prevInfoWindow.close();
			}

			// console.log(ourLocations[dataItem]['wiki']);

			$.ajax({
					url: 'http://en.wikipedia.org/w/api.php',
					data: { action: 'query', pageids: 2, prop: "images", format: 'json' },
					dataType: 'jsonp',
					success: function(data) {
							var images = data.query.pages[2].images;
							var image_files = [];
							
							for(var image_idx in images)
							{
							image_files.push(images[image_idx].title);
							}
						
							title = data.query.pages[2].title.replace(' ','_');
							$.ajax({
							url: 'http://' + lang + '.wikipedia.org/w/api.php',
							data: {
								action: 'parse',
								prop: 'text',
								page: title,
								format:'json'
							},
							dataType:'jsonp',
							success: function(data) {
								wikipage = $("<div>"+data.parse.text['*']+"<div>").children('p:first');
								wikipage.find('sup').remove();
								wikipage.find('a').each(function() {
								$(this)
									.attr('href', 'http://' + lang + '.wikipedia.org'+$(this).attr('href'));
								});
								
								func({
								"title": title,
								"html": wikipage,
								"article_url": 'http://' + lang + '.wikipedia.org/wiki/' + title,
								"images" : image_files
								});
		
							}
						});
					}
			});

			function processResult(apiResult){
				console.log(apiResult);	
				for (var i = 0; i < apiResult.query.search.length; i++){

							console.log(apiResult);
					}
			}

			infoWindow = new google.maps.InfoWindow({
				content: "<div style='float:right; padding: 10px;'><b>"+ourLocations[dataItem]['name']+"</b><br/>"+ourLocations[dataItem]['description']+"<br/></div><a href='"+ourLocations[dataItem]['url']+">website</a>"
				//content: "<h2>" + ourLocations[dataItem]['description'] + "</h2>\n" + "<a href='" + ourLocations[dataItem]['url'] + "'>Website</a>"
			});
			
			infoWindow.open(map, this),
			info.setAnimation(google.maps.Animation.BOUNCE)
			setTimeout(function() {
				info.setAnimation(null)
			}, 2000);

			prevInfoWindow = infoWindow;
		});
	});

	self.listViewClick = function(place) {

		console.log(place);

		if (place.name) {

			if (prevInfoWindow) {
				prevInfoWindow.close();
			}

			map.setZoom(15);
			map.panTo(place.latlng);
			place.marker.setAnimation(google.maps.Animation.BOUNCE);

			infoWindow = new google.maps.InfoWindow({
				content: "<h2>" + place['description'] + "</h2>\n" + "<a href='" + place['url'] + "'>Website</a>"
			});

			infoWindow.open(map, place.marker);
			prevInfoWindow = infoWindow;
		}
		setTimeout(function() {
			place.marker.setAnimation(null);
		}, 2000);
	};

	self.query = ko.observable('');
	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.sortedLocations(), function(listResult) {
			return listResult.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
		});
	});

};

function googleError() {
};

//initMap();
$(document).ready(function() {
	//$.noConflict();
	setTimeout(function(){ initMap(); }, 500);
	setTimeout(function(){ ko.applyBindings(appViewModel()); }, 500);
	// ko.applyBindings(appViewModel());
});