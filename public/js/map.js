var map = L.map('map').setView([-6.17396, 106.8271], 10)

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
  // L.tileLayer(
  //   'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=58bdddc89c04a56227a001e022e3949a',
  //   {
  maxZoom: 10,
  minZoom: 4,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map)

// tempLayer()
// windLayer()

const windLayerGroup = L.layerGroup()
const tempLayerGroup = L.layerGroup()

let windLayerActive = false
let tempLayerActive = false

function windLayer() {
  if (!windLayerActive) {
    var url_u = 'https://tes-leaflet-be.vercel.app/api/storage/U.asc'
    var url_v = 'https://tes-leaflet-be.vercel.app/api/storage/V.asc'
    var urls = [url_u, url_v]
    var promises = urls.map((url) => fetch(url).then((r) => r.text()))
    Promise.all(promises).then(function (arrays) {
      let vf = L.VectorField.fromASCIIGrids(arrays[0], arrays[1], 50)
      let windLayerInstance = L.canvasLayer.vectorFieldAnim(vf).addTo(map)
      map.fitBounds(windLayerInstance.getBounds())

      windLayerActive = true
      tempLayerActive = false
    })
  }
}

function tempLayer() {
  if (!tempLayerActive) {
    var url_t = 'https://tes-leaflet-be.vercel.app/api/storage/T.asc'
    var urls = [url_t]
    var promises = urls.map((url) => fetch(url).then((r) => r.text()))
    Promise.all(promises).then(function (arrays) {
      var s = L.ScalarField.fromASCIIGrid(arrays[0])
      let tempLayerInstance = L.canvasLayer
        .scalarField(s, {
          color: chroma.scale('OrRd').domain(s.range),
        })
        .addTo(map)
      map.fitBounds(tempLayerInstance.getBounds())

      tempLayerActive = true
      windLayerActive = false
    })
  }
}

const windId = document.getElementById('ButtonWind')
const toogleWind = windId.addEventListener('click', function () {
  windLayer()
})

const tempId = document.getElementById('ButtonTemp')
const toogleTemp = tempId.addEventListener('click', function () {
  tempLayer()
})
