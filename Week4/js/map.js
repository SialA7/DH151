// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
// path to csv data
let path = "data/occurrence.csv";
let path2 = "data/multimedia.csv"
let norCalMarkers = L.featureGroup();
let centCalMarkers = L.featureGroup(); 
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
	readCSV(path, path2);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path, path2){
	
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			Papa.parse(path2, {
				header: true, 
				download: true, 
				complete: function(images){
					console.log(images)

					/* data.data.forEach(function(item){
						images.images.forEach(function(image){
							if (item.gbifID == image.gbifID){
								item.reference = image.reference,
								item.publisher = image.publisher,
								item.rightsHolder = image.rightsHolder
							}
						})
					}) */

					// map the data
					mapCSV(data);
				}
			}) 
		}
	});
}

var otterIcon = L.Icon.extend({
    options: {
        iconUrl: 'images/otter-icon.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    }
});

function mapCSV(data){

	// loop through each entry
	data.data.forEach(function(item){
		// create a marker
		var marker = L.marker([item.latitude,item.longitude], otterIcon)
		.on('mouseover',function(){
			this.bindPopup(`${item.date}<br><img src="${item.reference}">`).openPopup()
		})
        //attach to image from multimedia file

		marker.setIcon(new otterIcon)
		// add marker to featuregroup
		if (item.latitude <= 38 && item.latitude >= 36){
			norCalMarkers.addLayer(marker)
		}
		else {
			centCalMarkers.addLayer(marker)
		}
		markers.addLayer(marker)
		// add entry to sidebar
		//$('.sidebar').append(`<img src="${item.thumbnail_url}" onmouseover="panToImage(${index})">`)
	})

	// add featuregroup to map
	norCalMarkers.addTo(map)
	centCalMarkers.addTo(map)


	// fit map to markers
	map.fitBounds(markers.getBounds())

	$('.sidebar').append(`<div class="sidebar-item" onclick="map.fitBounds(norCalMarkers.getBounds())">Northern California</div>`)
	$('.sidebar').append(`<div class="sidebar-item" onclick="map.fitBounds(centCalMarkers.getBounds())">Central California</div>`)
}