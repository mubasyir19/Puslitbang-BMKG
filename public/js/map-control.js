const mapBeUrl = 'https://storage.googleapis.com/tiles-pi-project-392410'

const dateRangeText = document.getElementById('dateRangeText')
const dateRangeInput = document.getElementById('dateRangeInput')
const btnPrev = document.getElementById('btnPrev')
const btnNext = document.getElementById('btnNext')
const variableLayerController = document
  .getElementById('variableLayerController')
  .getElementsByTagName('button')
const levelLayerController = document
  .getElementById('levelLayerController')
  .getElementsByTagName('button')
const windAnimationLayerControl = document.getElementById(
  'windAnimationLayerControl',
)
const valueLabelLayerControl = document.getElementById('valueLabelLayerControl')
const initialTime = document.getElementById('initialTime')
const initialHour = document.getElementById('initialHour')
const initialTimeList = document
  .getElementById('initialTimeList')
  .getElementsByTagName('button')
const initialHourList = document
  .getElementById('initialHourList')
  .getElementsByTagName('button')

const mapControl = {
  variable: 'wspd',
  level: '1000',
  initialTime: initialTime.value + initialHour.value,
  predictionTimeActive: 0,
  predictionTime: [],
  min: 0,
  max: 24,
  step: 1,
  activeLayer: null,
  windLayer: null,
  variableLabels: null,
}

predTimeHandler()

for (let i = 0; i < variableLayerController.length; i++) {
  variableLayerController[i].addEventListener('click', () => {
    const activeVariable = variableLayerController[i].getAttribute('id')
    mapControl.variable = activeVariable
    changeLayer()
  })
}

for (let i = 0; i < levelLayerController.length; i++) {
  levelLayerController[i].addEventListener('click', () => {
    const activeLevel = levelLayerController[i].getAttribute('id')
    mapControl.level = activeLevel
    changeLayer()
  })
}

windAnimationLayerControl.addEventListener('click', () => {
  if (mapControl.windLayer.isVisible()) {
    mapControl.windLayer.hide()
  } else {
    mapControl.windLayer.show()
  }
})

valueLabelLayerControl.addEventListener('click', () => {
  if (map.getPane('variable-label').style.display !== 'none') {
    map.getPane('variable-label').style.display = 'none'
  } else {
    map.getPane('variable-label').style.display = 'block'
  }
})

async function setVariableLayer() {
  const layer = await variableLayerHandler()
  if (layer !== null) {
    mapControl.activeLayer = layer
    mapControl.activeLayer.addTo(map)
  }
}
setVariableLayer()

async function setWindLayer() {
  const layer = await windAnimationLayerHandler()
  if (layer !== null) {
    mapControl.windLayer = layer
    mapControl.windLayer.addTo(map)
  }
}
setWindLayer()

async function setVariableLabel() {
  const layers = await variableLabelHandler()
  if (layers !== null) {
    mapControl.variableLabels = layers
    for (let i = 0; i < layers.length; i++) {
      mapControl.variableLabels[i].addTo(map)
    }
  }
}
setVariableLabel()

for (let i = 0; i < initialTimeList.length; i++) {
  initialTimeList[i].addEventListener('click', () => {
    mapControl.initialTime = initialTimeList[i].value + initialHour.value
    predTimeHandler()
    changeLayer()
  })
}

for (let i = 0; i < initialHourList.length; i++) {
  initialHourList[i].addEventListener('click', () => {
    mapControl.initialTime = initialTime.value + initialHourList[i].value
    predTimeHandler()
    changeLayer()
  })
}

dateRangeInput.setAttribute('value', mapControl.predictionTimeActive.toString())
dateRangeInput.setAttribute('min', mapControl.min.toString())
dateRangeInput.setAttribute('max', mapControl.max.toString())
dateRangeInput.setAttribute('step', mapControl.step.toString())

let textPosition = 0
dateRangeInput.addEventListener('input', () => {
  mapControl.predictionTimeActive = parseInt(dateRangeInput.value)
  playerHandler(mapControl.predictionTimeActive)
})

btnNext.addEventListener('click', () => {
  if (mapControl.predictionTimeActive < mapControl.max) {
    playerHandler((mapControl.predictionTimeActive += 1))
  }
})

btnPrev.addEventListener('click', () => {
  if (mapControl.predictionTimeActive > mapControl.min) {
    playerHandler((mapControl.predictionTimeActive -= 1))
  }
})

function playerHandler(v) {
  dateRangeInput.value = v
  dateRangeText.innerText = getWibStr(
    mapControl.predictionTime[mapControl.predictionTimeActive],
  )
  textPosition = (v / 24) * 100
  if (textPosition < 50) {
    dateRangeText.style.left = textPosition + '%'
    dateRangeText.style.right = null
  } else {
    dateRangeText.style.right = 100 - textPosition + '%'
    dateRangeText.style.left = null
  }
  changeLayer()
}

function getDateStr(d) {
  return (
    String(d.getFullYear()) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    String(d.getHours()).padStart(2, '0')
  )
}

function getWibStr(d) {
  const dd = new Date(d)
  dd.setHours(dd.getHours() + 7)
  const day = dd.getDate()
  // prettier-ignore
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[dd.getMonth()]
  const hours = String(dd.getHours()).padStart(2, '0')
  const minutes = String(dd.getMinutes()).padStart(2, '0')
  return `${day} ${month} ${hours}:${minutes}`
}

async function variableLayerHandler() {
  return fetch('/assets/xlat.tif')
    .then((r) => r.arrayBuffer())
    .then(function (buffer) {
      const s = L.ScalarField.fromGeoTIFF(buffer)
      const latLngBounds = [
        [s.yllCorner, s.xllCorner],
        [s.yurCorner, s.xurCorner],
      ]
      const img = `${mapBeUrl}/${mapControl.initialTime}/${getDateStr(
        mapControl.predictionTime[mapControl.predictionTimeActive],
      )}/${mapControl.level}/${mapControl.variable}/${mapControl.variable}.jpg`
      try {
        return fetch(img).then((r) => {
          if (r.ok) {
            const layer = L.imageOverlay(img, latLngBounds, {
              pane: 'variable',
            })
            return layer
          } else {
            return null
          }
        })
      } catch (err) {}
    })
}

async function windAnimationLayerHandler() {
  const uvUrl = [
    `${mapBeUrl}/${mapControl.initialTime}/${getDateStr(
      mapControl.predictionTime[mapControl.predictionTimeActive],
    )}/${mapControl.level}/u/u.tif`,
    `${mapBeUrl}/${mapControl.initialTime}/${getDateStr(
      mapControl.predictionTime[mapControl.predictionTimeActive],
    )}/${mapControl.level}/v/v.tif`,
  ]

  const promises = uvUrl.map(async (url) => {
    try {
      return await fetch(url).then((r) => r.arrayBuffer())
    } catch (err) {}
  })
  return Promise.all(promises).then(function (arrays) {
    try {
      const vf = L.VectorField.fromGeoTIFFs(arrays[0], arrays[1], 50)
      const layer = L.canvasLayer.vectorFieldAnim(vf)
      return layer
    } catch (err) {
      return null
    }
  })
}

async function getLatlonData() {
  const uvUrl = [
    `/assets/xlat.tif`,
    `/assets/xlong.tif`,
    `${mapBeUrl}/${mapControl.initialTime}/${getDateStr(
      mapControl.predictionTime[mapControl.predictionTimeActive],
    )}/${mapControl.level}/${mapControl.variable}/${mapControl.variable}.tif`,
  ]

  const promises = uvUrl.map(async (url) => {
    try {
      return await fetch(url).then((r) => r.arrayBuffer())
    } catch (err) {}
  })

  return Promise.all(promises).then(function (arrays) {
    try {
      const vf = L.VectorField.fromGeoTIFFs(arrays[0], arrays[1])
      const v = L.ScalarField.fromGeoTIFF(arrays[2])

      return {
        grid: vf.grid,
        value: v.grid,
      }
    } catch (err) {
      return null
    }
  })
}

async function variableLabelHandler() {
  const data = await getLatlonData()
  if (data === null) return null

  async function getColor() {
    return fetch(`/assets/${mapControl.variable}_color.txt`)
      .then((r) => r.text())
      .then((text) => {
        const c = text.split(/\r?\n/).map((c) => {
          const cc = c.split(' ')
          return {
            value: cc[0],
            color: `rgb(${cc[1]},${cc[2]},${cc[3]})`,
          }
        })
        return c
      })
  }

  function getValueByLatlon(latlon) {
    let nlat = 9999
    for (let i = 0; i < data.grid.length; i++) {
      if (nlat >= Math.abs(data.grid[i][0].u - latlon[0])) {
        nlat = Math.abs(data.grid[i][0].u - latlon[0])
      } else {
        nlat = i
        break
      }
    }
    let nlon = 9999
    for (let i = 0; i < data.grid[0].length; i++) {
      if (nlon >= Math.abs(data.grid[0][i].v - latlon[1])) {
        nlon = Math.abs(data.grid[0][i].v - latlon[1])
      } else {
        nlon = i
        break
      }
    }

    return data.value[nlat][nlon]
  }

  function addVarLabel(value, latlon, color) {
    const varLabel = L.divIcon({
      className: 'label-icon',
      html: `<span style="background:${color};color:black;padding:3px;border-radius:5px">${value}</span>`,
    })
    return L.marker(latlon, { icon: varLabel, pane: 'variable-label' })
  }

  const c = await getColor()
  return fetch('/assets/province-coordinates.json')
    .then((r) => r.json())
    .then((json) => {
      const labels = []
      for (let data of json) {
        const latlon = [data.latitude, data.longitude]
        const value = Math.round(getValueByLatlon(latlon))
        let color = ''
        c.map((cc) => {
          if (value >= cc.value) {
            color = cc.color
          }
        })
        const label = addVarLabel(value, latlon, color)
        labels.push(label)
      }
      return labels
    })
}

async function changeLayer() {
  const nextVariableLayer = await variableLayerHandler()
  if (nextVariableLayer !== null) {
    map.getPane('variable').style.display = 'block'
    nextVariableLayer.addTo(map)
    mapControl.activeLayer = nextVariableLayer
  } else {
    if (mapControl.activeLayer !== null) {
      map.getPane('variable').style.display = 'none'
    }
  }

  const nextWindLayer = await windAnimationLayerHandler()
  if (nextWindLayer !== null) {
    nextWindLayer.addTo(map)
    if (mapControl.windLayer !== null) {
      if (!mapControl.windLayer.isVisible()) {
        nextWindLayer.hide()
      }
      mapControl.windLayer.hide()
    }
    mapControl.windLayer = nextWindLayer
  } else {
    if (mapControl.windLayer !== null) {
      mapControl.windLayer.hide()
    }
    mapControl.windLayer = null
  }

  const nextVariableLabel = await variableLabelHandler()
  if (nextVariableLabel !== null) {
    if (mapControl.variableLabels !== null) {
      for (let i = 0; i < nextVariableLabel.length; i++) {
        mapControl.variableLabels[i].removeFrom(map)
      }
    }
    mapControl.variableLabels = nextVariableLabel
    for (let i = 0; i < nextVariableLabel.length; i++) {
      mapControl.variableLabels[i].addTo(map)
    }
  } else {
    for (let i = 0; i < mapControl.variableLabels.length; i++) {
      mapControl.variableLabels[i].removeFrom(map)
    }
    mapControl.variableLabels = null
  }
}

function predTimeHandler() {
  mapControl.predictionTime = []
  for (let i = 0, j = 0; i < 25; i++, j += 3) {
    let ds = mapControl.initialTime
    ds = `${ds.slice(0, 4)}-${ds.slice(4, 6)}-${ds.slice(6, 8)}`
    let d = new Date(ds)
    d.setHours(mapControl.initialTime.slice(8, 10))
    d.setHours(d.getHours() + j)
    mapControl.predictionTime.push(d)
  }
  dateRangeText.innerText = getWibStr(
    mapControl.predictionTime[mapControl.predictionTimeActive],
  )
}

async function onClickLayerHandler(e) {
  const data = await getLatlonData()
  if (data === null) return null

  let nlat = 9999
  for (let i = 0; i < data.grid.length; i++) {
    if (nlat >= Math.abs(data.grid[i][0].u - e.latlng.lat)) {
      nlat = Math.abs(data.grid[i][0].u - e.latlng.lat)
    } else {
      nlat = i
      break
    }
  }
  let nlon = 9999
  for (let i = 0; i < data.grid[0].length; i++) {
    if (nlon >= Math.abs(data.grid[0][i].v - e.latlng.lng)) {
      nlon = Math.abs(data.grid[0][i].v - e.latlng.lng)
    } else {
      nlon = i
      break
    }
  }
  return data.value[nlat][nlon]
}

map.on('click', async (e) => {
  const west = mapControl.activeLayer.getBounds().getWest()
  const north = mapControl.activeLayer.getBounds().getNorth()
  const east = mapControl.activeLayer.getBounds().getEast()
  const south = mapControl.activeLayer.getBounds().getSouth()

  if (
    e.latlng.lng < west ||
    e.latlng.lng > east ||
    e.latlng.lat > north ||
    e.latlng.lat < south
  ) {
    return
  }

  const v = await onClickLayerHandler(e)
  if (v === null) return

  let unit
  switch (mapControl.variable) {
    case 'wspd':
      unit = 'm/s'
      break
    case 'tc':
      unit = 'c'
      break
    case 'rh':
      unit = '%'
      break
  }

  L.popup()
    .setLatLng(e.latlng)
    .setContent(`${Math.round(v)} ${unit}`)
    .openOn(map)
})
