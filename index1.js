// using fetch api

// total cases
let url = "https://api.covid19india.org/data.json";
fetch(url).then(response => response.json())
    .then(data => {

        let Total_statusHtml = `
                         <tr>
                            <th scope="row" class="text-warning">${data.statewise[0].confirmed}</th>
                            <td class="text-info">${data.statewise[0].active}</td>
                            <td class="text-success">${data.statewise[0].recovered}</td>
                            <td class="text-danger">${data.statewise[0].deaths}</td>
                        </tr>
                           `

        document.getElementById('total_status').innerHTML = Total_statusHtml;

        // pie chart
        let conf = parseInt(data.statewise[0].confirmed);
        let act = parseInt(data.statewise[0].active);
        let rec = parseInt(data.statewise[0].recovered);
        let deth = parseInt(data.statewise[0].deaths);

        let chart = document.getElementById('Total_case_piechart');
        // Chart.defaults.scale.ticks.beginAtZero = true;
        let pieChart = new Chart(chart, {
            type: 'pie',
            data: {
                labels: ['Confirmed Cases', 'Active Cases', 'Recovered Cases', 'Death Cases'],
                datasets: [{
                    label: 'points',
                    backgroundColor: ['#f1c40f', '#0099ff', '#33cc33', '#ff0000'],
                    data: [conf, act, rec, deth]
                }]
            },
            options: {
                animation: {
                    animateScale: true
                }
            }

        });

    });

// statewise data-------------
fetch(url).then(response => response.json())
    .then(data => {
        data.statewise.shift();
        let statusHtml = "";
        data.statewise.forEach(function(obj, index) {
            // console.log(obj.state + " " + obj.confirmed + " " + obj.active + " " + obj.recovered + " " + obj.deaths);
            statusHtml += `
                         <tr>
                            <th scope="row" class="text-secondary">${index}</th>
                            <td class="text-primary">${obj.state}</td>
                            <td class="text-warning">${obj.confirmed}</td>
                            <td class="text-info">${obj.active}</td>
                            <td class="text-success">${obj.recovered}</td>
                            <td class="text-danger">${obj.deaths}</td>
                        </tr>
                           `
        });
        document.getElementById('status').innerHTML = statusHtml;

    });

// for chart
fetch(url).then(response => response.json())
    .then(data => {
        data.statewise.shift();
        var states = [];
        var confirmed = [];
        var active = [];
        var recoverd = [];
        var deaths = [];
        data.statewise.forEach(function(obj, index) {
            states.push(obj.state);
            confirmed.push(obj.confirmed);
            active.push(obj.active);
            recoverd.push(obj.recovered);
            deaths.push(obj.deaths);
        });
        let statewiseChart = document.getElementById('statewiseChart').getContext('2d');

        var chart = new Chart(statewiseChart, {
            type: 'bar',
            data: {
                labels: states,
                datasets: [{
                        label: "Confirmed cases",
                        data: confirmed,
                        backgroundColor: "#f1c40f",
                        minBarlength: 300
                    },
                    {
                        label: "Recoverd cases",
                        data: recoverd,
                        backgroundColor: "#2ecc71",
                        minBarlength: 300
                    },
                    {
                        label: "Death cases",
                        data: deaths,
                        backgroundColor: "#e74e3c",
                        minBarlength: 300
                    },
                ]
            },
            options: {}

        });

    });




//distric wise-----------------

let urldistrict = 'https://api.covid19india.org/state_district_wise.json';

function getdata(selectedState) {
    fetch(urldistrict).then(function(response) {
        return response.json()
    }).then(data => {
        var result = Object.entries(data);
        result.shift();
        // console.log(result);
        result.forEach(function(obj, index) {
            if (result[index][0] == selectedState) {
                var dist = Object.entries(result[index][1].districtData);
                let districtwisedata = document.getElementById('statusDistrictwise');
                let disthtml = "";
                dist.forEach(function(obj, index) {
                    disthtml += `
                        <tr>
                        <th scope="row" class="text-secondary">${index}</th>
                        <td class="text-primary">${dist[index][0]}</td>
                        <td class="text-warning">${dist[index][1].confirmed}</td>
                        <td class="text-info">${dist[index][1].active}</td>
                        <td class="text-success">${dist[index][1].recovered}</td>
                        <td class="text-danger">${dist[index][1].deceased}</td>
                       </tr>
                       `
                });
                districtwisedata.innerHTML = disthtml;
            }
        });

    });
}

function getChart(statename) {
    fetch(urldistrict).then(function(response) {
        return response.json()
    }).then(data => {
        var result = Object.entries(data);
        result.shift();
        var district = [];
        var confirmed = [];
        var active = [];
        var recoverd = [];
        var deaths = [];
        result.forEach(function(obj, index) {
            if (result[index][0] == statename) {
                var dist = Object.entries(result[index][1].districtData);
                dist.forEach(function(obj, index) {
                    district.push(dist[index][0]);
                    confirmed.push(dist[index][1].confirmed);
                    active.push(dist[index][1].active);
                    recoverd.push(dist[index][1].recovered);
                    deaths.push(dist[index][1].deceased);
                });

                let districtwiseChart = document.getElementById('districtwiseChart').getContext('2d');
                var mchart = new Chart(districtwiseChart, {
                    type: 'bar',
                    data: {
                        labels: district,
                        datasets: [{
                                label: "Confirmed cases",
                                data: confirmed,
                                backgroundColor: "#f1c40f",
                                minBarlength: 300
                            },
                            {
                                label: "Recoverd cases",
                                data: recoverd,
                                backgroundColor: "#2ecc71",
                                minBarlength: 300
                            },
                            {
                                label: "Death cases",
                                data: deaths,
                                backgroundColor: "#e74e3c",
                                minBarlength: 300
                            },
                        ]
                    },
                    options: {}

                });

            }
        });

    });
}

let selectedState = document.getElementById('statename');
getdata(selectedState.value);
getChart(selectedState.value);
selectedState.addEventListener('change', function() {
    let statename = selectedState.options[selectedState.selectedIndex].value;
    getdata(statename);
    getChart(statename);
});