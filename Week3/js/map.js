var map = L.map('map').setView([39.0119, -98.4842], 5);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

        var newIcon = L.Icon.extend({
            options: {
                iconUrl: 'images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }
        });

        var defaultIcon = L.Icon.extend({
            options: {
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }
        });

		let homes = [
			{
                'id': 0,
				'name': "Philadelphia, PA",
                'date': "2002 to 2003",
				'lat': 39.9526, 
				'long': -75.1652, 
				'description': "I was born here on January 1. I don't remember much about my life here, but my parents always tell a story about how, when a bridge was closed due to the fireworks, they had to convince the police to let them drive across the bridge so they could get to the hospital in time.",
				'imgFile': "images/Philadelphia.jpg"
			},
			{
                'id': 1,
				'name': "Mt. Laurel, NJ",
                'date': "2003 to 2008",
				'lat': 39.9340,
				'long': -74.8910,
				'description': "I lived in Mt. Laurel between 1 and 6 years old. I was a shy kid who wasn't great at socializing, but I discovered other passions: particularly the vibrant world of reading! My mom would take me to the library twice a week, and I'd always pick up a stack of books which reached taller than my head when I lifted them up.",
				'imgFile': "images/MtLaurel.JPG"
			},
			{
                'id': 2,
				'name': 'Lexington, KY',
                'date': '2008 to 2012',
				'lat': 38.0406,
				'long': -84.5037,
				'description': "Lexington was my home between 6 and 10 years old. It's the place where I was unabashedly able to be a kid. I have fond memories of riding my bike to the candy store after school and playing Yu-Gi-Oh with my friends on the playground. One year, I met and adopted the two great loves of my life, my dogs Ollie and Sophie.",
				'imgFile': "images/Lexington.jpg"
			},
			{
                'id': 3,
				'name':'Oak Brook, IL',
                'date': '2012 to 2016',
				'lat': 41.8398,
				'long': -87.9536, 
				'description': "From 10 to 14 years old, I lived in Oak Brook. This is the place where I had to start to learn to grow up, to take the good with the bad, to get through the hard times and accept whatever result comes out on the other end. I weathered a lot of cold winters there and am a better person for them.",
				'imgFile': "images/OakBrook.gif"
			}, 
			{
                'id': 4,
				'name': 'Irvine, CA',
                'date':'2016 to 2021',
				'lat': 33.6846,
				'long': -117.8265,
				'description': "I lived in Irvine from 14 to 19 years old. At first when I moved there, I was shocked because it felt almost like moving to a different country: the plants and buildings around me looked so different! Nonetheless, I have a soft spot in my heart for Irvine, because it's the place where I gained many valuable friendships and learned to depend on other people when the times get tough.",
				'imgFile': "images/Irvine.jpg"
			},
			{
                'id': 5,
				'name': 'Los Angeles, CA',
                'date': '2021 to ???',
				'lat': 34.0689,
				'long': -118.4452, 
				'description': "For the last year or so, Los Angeles has been my home. It's an awfully short amount of time to be able to call a place a home, but, as a transfer student during the pandemic, this is all the time I have! I definitely don't think my chapter in LA is over, and I still have lots to learn here.",
				'imgFile': 'images/Westwood.jpg'
			}
			
		]

        let myMarkers = L.featureGroup();
		
		homes.forEach(function(item){  
			var marker = L.marker([item.lat, item.long]).addTo(map)
				.bindPopup(item.name+ "<br>" + "<img src=" + item.imgFile + " width = 200 height = 200>" + "<br>" + item.description)
				.openPopup(); 

            myMarkers.addLayer(marker)

            $('.sidebar').append(`<div class="sidebar-item" onmouseenter= "changeMarkerColor(${item.id})" onmouseleave="defaultMarkerColor(${item.id})" onclick="flyToIndex(${item.id})">${item.name}</div>`)
		}
		)	

        myMarkers.addTo(map)

        let layers = {
            "My Homes": myMarkers
        }

        L.control.layers(null,layers).addTo(map)

        function flyToIndex(index){
            myMarkers.getLayers()[index].openPopup()
            map.flyTo([homes[index].lat+.1,homes[index].long],11)
        }

        function changeMarkerColor(index){
            myMarkers.getLayers()[index].setIcon(new newIcon);
        }

        function defaultMarkerColor(index){
            myMarkers.getLayers()[index].setIcon(new defaultIcon)
        }
