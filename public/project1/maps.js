var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoid2FuZGEwMjU0IiwiYSI6ImNqbjh4cWVwNzBvdzEzd3BrbDc2OGJ1ZGUifQ.DZ-M8o1dNp75NwUjwvQJcw';
var map = new mapboxgl.Map({
  container: 'YOUR_CONTAINER_ELEMENT_ID',
  style: 'mapbox://styles/mapbox/streets-v10'
});
