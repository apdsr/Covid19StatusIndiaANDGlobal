function updateMap() {
    fetch('https://corona.lmao.ninja/v2/countries').then(Response => Response.json()).then(data => {
        // for upload initial country details
        document.getElementById('imageFlag').src = data[0].countryInfo.flag;
        document.getElementById('titleCountry').innerHTML = data[0].country.toUpperCase();
        document.getElementById('ttlcase').innerHTML = numFormatter(data[0].cases);
        document.getElementById('ttlactive').innerHTML = numFormatter(data[0].active);
        document.getElementById('ttlrecvrd').innerHTML = numFormatter(data[0].recovered);
        document.getElementById('ttlcritical').innerHTML = numFormatter(data[0].critical);
        document.getElementById('ttldeath').innerHTML = numFormatter(data[0].deaths);


        data.forEach(element => {
            latitude = element.countryInfo.lat;
            longitude = element.countryInfo.long;
            cases = element.cases;
            let countR;
            let countG;
            let countB;
            if (cases > 500000) {
                countR = 230;
                countG = 46;
                countB = 0;
            } else if (cases > 50000) {
                countR = 255;
                countG = 117;
                countB = 26;
            } else {
                countR = 0;
                countG = 51;
                countB = 204;
            }

            //mark on the map
            var marker = new mapboxgl.Marker({
                    color: `rgb(${countR},${countG},${countB})`
                })
                .setLngLat([longitude, latitude])
                .addTo(map);


        });

    });
}

updateMap();

// total details

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 1000) {
        return num; // if value < 1000, nothing to do
    }
}

function getdetailsTotal() {
    fetch('https://corona.lmao.ninja/v2/all').then(Response => Response.json()).then(data => {

        document.getElementById('cofirmedCases').innerHTML = numFormatter(data.cases);
        document.getElementById('todaycofirmedCases').innerHTML = numFormatter(data.todayCases);
        document.getElementById('CasesPerMilion').innerHTML = numFormatter(data.casesPerOneMillion);

        document.getElementById('activecases').innerHTML = numFormatter(data.active);
        document.getElementById('activepermln').innerHTML = numFormatter(data.activePerOneMillion);

        document.getElementById('totalDeath').innerHTML = numFormatter(data.deaths);
        document.getElementById('todayDeath').innerHTML = numFormatter(data.todayDeaths);
        document.getElementById('DeathPermln').innerHTML = numFormatter(data.deathsPerOneMillion);

        document.getElementById('totalrecoverd').innerHTML = numFormatter(data.recovered);
        document.getElementById('todayrecoverd').innerHTML = numFormatter(data.todayRecovered);
        document.getElementById('recoverdPerMilln').innerHTML = numFormatter(data.recoveredPerOneMillion);

        document.getElementById('criticalTotal').innerHTML = numFormatter(data.critical);
        document.getElementById('cricticalpermln').innerHTML = numFormatter(data.criticalPerOneMillion);

        document.getElementById('Totaltest').innerHTML = numFormatter(data.tests);
        document.getElementById('testpermln').innerHTML = numFormatter(data.testsPerOneMillion);

        // pie chart
        let conf = parseInt(data.cases);
        let act = parseInt(data.active);
        let rec = parseInt(data.recovered);
        let deth = parseInt(data.deaths);

        let chart = document.getElementById('Total_Global_case_piechart');
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
}

getdetailsTotal();



// input auto complete

var countries = [];
fetch('https://corona.lmao.ninja/v2/countries').then(Response => Response.json()).then(data => {
    data.forEach(element => {
        countries.push(element.country);
    });

});

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();

                    //  after click country name selected then show details
                    let countryName = this.getElementsByTagName("input")[0].value;
                    fetch('https://corona.lmao.ninja/v2/countries').then(Response => Response.json()).then(data => {
                        data.forEach(element => {
                            if (countryName == element.country) {
                                console.log(element.country);
                                console.log(element.cases);
                                document.getElementById('titleCountry').innerHTML = countryName.toUpperCase();
                                document.getElementById('imageFlag').src = element.countryInfo.flag;
                                document.getElementById('ttlcase').innerHTML = numFormatter(element.cases);
                                document.getElementById('ttlactive').innerHTML = numFormatter(element.active);
                                document.getElementById('ttlrecvrd').innerHTML = numFormatter(element.recovered);
                                document.getElementById('ttlcritical').innerHTML = numFormatter(element.critical);
                                document.getElementById('ttldeath').innerHTML = numFormatter(element.deaths);


                            }
                        });
                    });



                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}
autocomplete(document.getElementById("myInput"), countries);