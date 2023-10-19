var map = L.map('map', {
  center: [-6.17396, 106.8271],
  zoom: 10,
  maxBounds: [
    [-11, 90],
    [11, 145],
  ],
})

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
  // L.tileLayer(
  //   'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=58bdddc89c04a56227a001e022e3949a',
  //   {
  maxZoom: 10,
  minZoom: 5,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map)

var url_u = 'https://tes-leaflet-be.vercel.app/api/storage/U.asc'
var url_v = 'https://tes-leaflet-be.vercel.app/api/storage/V.asc'
var url_t = 'https://tes-leaflet-be.vercel.app/api/storage/T.asc'
var urls = [url_u, url_v, url_t]
var promises = urls.map((url) => fetch(url).then((r) => r.text()))
Promise.all(promises).then(function (arrays) {
  //wind
  let vf = L.VectorField.fromASCIIGrids(arrays[0], arrays[1], 50)
  let layer1 = L.canvasLayer.vectorFieldAnim(vf)

  //temp
  var s = L.ScalarField.fromASCIIGrid(arrays[2])
  let layer2 = L.canvasLayer.scalarField(s, {
    color: chroma.scale('OrRd').domain(s.range),
  })

  // layer2.addTo(map)
  // layer1.addTo(map)

  L.control
    .layers(
      {},
      {
        wind: layer1,
        temp: layer2,
      },
    )
    .addTo(map)

  map.fitBounds(layer1.getBounds())
})
