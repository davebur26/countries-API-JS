var url = 'https://restcountries.eu/rest/v2/all'

// var addCountriesToList = function( countries ){
//   for (var country of countries){
//     var ul = document.querySelector('#countries')
//     var li = document.createElement("li")
//     li.innerText = country.name
//     ul.appendChild(li)
//   }
// }


var addCountriesToDropDown = function(countries) {
  var dropDown = document.getElementById("drop-down");
  for (var country of countries){
    var option = document.createElement("option")
    option.innerHTML = country.name
    dropDown.appendChild(option)
  }
}

var addNeeborCountries = function(neeborCountries) {

  var dropDown = document.getElementById("neebors");

  dropDown.innerHTML = ""

  for (var country of neeborCountries){
    var option = document.createElement("option")
    option.innerHTML = country
    dropDown.appendChild(option)
  }
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
  addCountriesToDropDown(countries)

  var jsonString = localStorage.getItem("country")
  var savedCountry = JSON.parse(jsonString)
  writeContent(savedCountry)


  var handleSelectChange = function() {
    if ( savedCountry ) {
      addNeeborCountries(savedCountry.borders)
    }
    var selectedCountryName = this.value;
    findCountryObject(selectedCountryName, countries);
  }
  var select = document.querySelector("select");
  select.addEventListener("change", handleSelectChange);
}

// var button = document.getElementById('btn')
// button.addEventListener('click', function() {
//   makeRequest( url )
// })

var dropDown = document.getElementById("drop-down");

var buttonClear = document.getElementById('clear')
buttonClear.addEventListener('click', function() {
  var ul = document.getElementById("countries")
  ul.innerHTML = ""
})





var findCountryObject = function(countryName, countries) {
  for(var country of countries){
    if (country.name === countryName){
      writeContent(country)
      addNeeborCountries(country.borders)

    }
  }
}

var writeContent = function(country) {
  var pTag1 = document.querySelector("#selectedDDName")
  var pTag2 = document.querySelector("#selectedDDPop")
  var pTag3 = document.querySelector("#selectedDDCapital")

  if(country){

  var countryStringName = "Country Name: " + country.name
  var countryStringPop =  "Country Population: " + country.population
  var countryStringCapital = "Country Capital: " + country.capital
  var jsonString = JSON.stringify(country)
  localStorage.setItem("country", jsonString)
  addNeeborCountries(country.borders)


  pTag1.innerHTML = countryStringName
  pTag2.innerHTML = countryStringPop
  pTag3.innerHTML = countryStringCapital
}
}

makeRequest(url)
