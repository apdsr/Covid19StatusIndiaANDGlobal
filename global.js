function updateMap() {
    fetch('/data.json').then(Response => Response.json()).then(dataresponse => {
        console.log(dataresponse.data);
        dataresponse.data.forEach(element => {
            latitude = element.latitude;
            longitude = element.longitude;

            cases = element.infected;
            console.log(cases);
            let count;
            if (cases > 1000) {
                count = 251;
            } else {
                count = 51
            }
            //mark on the map
            new mapboxgl.Marker({
                    draggable: false,
                    color: `rgb(${count}, 0, 0)`
                })
                .setLngLat([longitude, latitude])
                .addTo(map);


        });
    });
}

let interval = 2000;
setInterval(updateMap, interval);