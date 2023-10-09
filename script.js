var zoom = 5;
var map = L.map('map').setView([0, 0], zoom);
var oldMarker = L.marker([0, 0]).addTo(map);
var counter = 0;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function logData() {
  const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const data = await response.json();
  //console.log(data);

  // hakee pastLocation muistista
  var pastLocation = JSON.parse(localStorage.getItem('pastLocation')) || [];

  var lat = data.latitude;
  var lon = data.longitude;
  //var pastLocation = [];

  // päivittää array uduet arvon ja tallentaa tiedot muistiin
  pastLocation.push(lat, lon)
  localStorage.setItem('pastLocation', JSON.stringify(pastLocation));


  //keskittää kartan vaa ekalla kerralla
  if (counter === 0) {
    map.setView([lat, lon], zoom);
  }

  //poistaa nykyisen markerin ja laittaa uuden
  map.removeLayer(oldMarker);
  var newMarker = L.marker([lat, lon]).addTo(map);
  oldMarker = newMarker;

  // piirtää punasen pisteen vanhaan paikkaan
  for (var i = 0; i < pastLocation.length; i += 2) {
    var circle = L.circle([pastLocation[i], pastLocation[i + 1]], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  }

  // console.log(pastLocation)
}

logData();

function getLocation() {
  logData();
  counter++;
}
if (counter === 10) {
  clearInterval(intervalId);
}
// hakee tauon jälkeen getLocation funktion
var intervalId = setInterval(getLocation, 15000);







