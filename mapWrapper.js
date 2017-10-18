var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
    // console.log(this.zoom);
  })
  this.addMapChange = this.addMapChange.bind(this)


}

MapWrapper.prototype.addMapChange = function (LatLng, area) {
  var coords = new google.maps.LatLng(LatLng[0],LatLng[1])
  this.googleMap.setCenter(coords)
  var zoom = (13.769 * Math.pow(area, -0.094)).toFixed(4)
  this.googleMap.setZoom(zoom)
}
