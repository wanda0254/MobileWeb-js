let mymap = L.map('mapid').setView([-6.5696364,105.7515915],7);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoid2FuZGEwMjU0IiwiYSI6ImNqbmFmdW1qYzcwYngzdm54eXZseGNhcGEifQ.BbVIVJoQmgOSNTiW8Z96ZA'
}).addTo(mymap);

function findLocation(x,y) {
    console.log(x,y);
    for (var i=0; i<places.length; i++) {
        if (places[i].lokasi[0] == x && places[i].lokasi[1] == y) {
            return i;
        }
    }
}

function showLocation(e) {
    // console.log("you clicked " + e.latlng.lat + " dan " + e.latlng.lng);
    let ix = findLocation(e.latlng.lat,e.latlng.lng);
    if(ix >= 0) {
        img.src = places[ix].gambar;
        head.textContent = places[ix].sponsor;
        par.textContent = places[ix].review;

        desc.setAttribute("style", "background: #fff; border: 1px solid black; border-radius: 20px; display: block; position: absolute; top: 1%; left: 35%; width: 30%; padding: 20px; z-index: 401;");
        desc.children[0].style.width = "300px";
        desc.children[0].style.height = "150px";
        desc.children[0].style.display = "block";
        desc.children[0].style.margin = "0 auto";
        desc.children[1].style.display = "block";
        desc.children[1].style.textAlign = "center";
        desc.children[2].style.textAlign = "center";
    } else {
        desc.style.display = "none";
    }
}

let desc = document.getElementById("desc");
let img =  document.createElement('img');
let par =  document.createElement('p');
let head = document.createElement('h2');

desc.appendChild(img);
desc.appendChild(head);
desc.appendChild(par);
desc.style.display === "none";

const URL = "data/peta.json";

fetch(URL)
    .then(function(response){
        if (response.status !== 200) { 
            console.log('Ada masalah. Status Code: ' + response.status); 
            return; 
        } 
        return response.json() 
    }) 
    .then ( resp => {
        let places = resp.places; 
        localStorage.setItem('places', JSON.stringify(resp.places)); 
    })
    .catch(function(err) { 
        console.log(err); 
});

let places= JSON.parse(localStorage.getItem('places')); 
for (var p of places) {
    var marker= L.marker(p.lokasi).addTo(mymap); 
    marker.on('click', showLocation); 
}

mymap.on('click', showLocation);
