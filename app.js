var url = 'https://restcountries.eu/rest/v2/all'

var initialize = function(){

}


var addCountriesToDropDown = function(countries) {
  var dropDown = document.getElementById("drop-down");
  for (var country of countries){
    var option = document.createElement("option")
    option.innerHTML = country.name
    dropDown.appendChild(option)
  }
}

var addNeeborCountries = function(neeborCountries, countries) {
  var dropDown = document.getElementById("neebors");
  dropDown.innerHTML = ""

  var countriesFullName = []

  for (var countryShortCut of neeborCountries){
    var fullName = findCountryByThreeLet(countryShortCut, countries)
    countriesFullName.push(fullName.name)
  }

  for (country of countriesFullName){
    // var option = document.createElement("option")
    // option.innerHTML = country
    // dropDown.appendChild(option)

    var ul = document.querySelector('#neebors')
    var li = document.createElement("li")
    li.innerText = country
    ul.appendChild(li)
  }

  // var addCountriesToList = function( countries ){
  //   for (var country of countries){

  //   }
  // }



}

var makeRequest = function( url ) {
  var request = new XMLHttpRequest();
  request.open( "GET" , url );
  request.addEventListener( "load", function() {
    var countries = JSON.parse( this.responseText ) || [];
    // addCountriesToList(countries)
    render(countries);
  })
  request.send()
}

var render = function(countries){

  var mapDiv = document.getElementById('main-map');
  var center = {lat: 55.9470, lng: -3.2020};
  var mainMap = new MapWrapper(mapDiv, center, 6);


  addCountriesToDropDown(countries)


  var jsonString = localStorage.getItem("country")
  var savedCountry = JSON.parse(jsonString)


  writeContent(savedCountry, countries)
  mainMap.addMapChange(savedCountry.latlng, savedCountry.area)
  console.log(13.036 * Math.pow(savedCountry.area, -0.094));





  var handleSelectChange = function() {
    if ( savedCountry ) {
      addNeeborCountries(savedCountry.borders, countries)
      //addMapChange(savedCountry.latlng)
    }
    console.log(this.value);
    var selectedCountryName = this.value;
    var countryObject = findCountryObject(selectedCountryName, countries);
    mainMap.addMapChange(countryObject.latlng, countryObject.area)
    console.log(13.036 * Math.pow(countryObject.area, -0.094));

  }

  var selectMainDD = document.querySelector("#drop-down");
  selectMainDD.addEventListener("change", handleSelectChange);



}

// var button = document.getElementById('btn')
// button.addEventListener('click', function() {
//   makeRequest( url )
// })

var dropDown = document.getElementById("drop-down");

// var buttonClear = document.getElementById('clear')
// buttonClear.addEventListener('click', function() {
//   var ul = document.getElementById("countries")
//   ul.innerHTML = ""
// })





var findCountryObject = function(countryName, countries) {
  for(var country of countries){
    if (country.name === countryName){
      writeContent(country, countries)
      addNeeborCountries(country.borders, countries)
      return country

    }
  }
}

var findCountryByThreeLet = function(countryThreeLet, countries) {
  for(var country of countries){
    if (country.alpha3Code === countryThreeLet){
      return country
    }
  }
}


var writeContent = function(country, countries) {
  var pTag1 = document.querySelector("#selectedDDName")
  var pTag2 = document.querySelector("#selectedDDPop")
  var pTag3 = document.querySelector("#selectedDDCapital")

  if(country){

    var countryStringName = "Country Name: " + country.name
    var countryStringPop =  "Country Population: " + country.population
    var countryStringCapital = "Country Capital: " + country.capital
    var jsonString = JSON.stringify(country)
    localStorage.setItem("country", jsonString)
    addNeeborCountries(country.borders, countries)

    pTag1.innerHTML = countryStringName
    pTag2.innerHTML = countryStringPop
    pTag3.innerHTML = countryStringCapital
  }
}

makeRequest(url)
// window.addEventListener('load', initialize);
window.addEventListener('load', render);
