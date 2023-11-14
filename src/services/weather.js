import axios from 'axios'
import { xml2json } from 'xml-js'

export async function getDataWeather() {
  const { data } = await axios.get(
    'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml',
  )

  const jsonData = xml2json(data)
  const resultJSON = JSON.parse(jsonData)

  const items = resultJSON.elements[0].elements[0].elements
  const areas = items.filter((area) => area.name === 'area')

  const dataWilayah = areas.map((wilayah) => {
    const parameters = wilayah.elements
      .filter((param) => param.name === 'parameter')
      .map((prm) => {
        const parameterID = prm.attributes.id
        const parameterDescription = prm.attributes.description
        const parameterType = prm.attributes.type
        const parameterElements = prm.elements

        const hourly = parameterElements.map((h) => {
          const unit = h.elements.map((u) => {
            return {
              unit: u.attributes.unit,
              value: u.elements[0].text,
            }
          })
          return {
            // attributes: h.attributes,
            type: h.attributes.type,
            h: h.attributes.h,
            datetime: h.attributes.datetime,
            elements: unit,
          }
        })

        return {
          Id: parameterID,
          Unit: parameterDescription,
          Type: parameterType,
          Elements: hourly,
        }
      })

    return {
      ID: wilayah.attributes.id,
      Kota: wilayah.attributes.description,
      Provinsi: wilayah.attributes.domain,
      Latitude: wilayah.attributes.latitude,
      Longitude: wilayah.attributes.longitude,
      Coordinate: wilayah.attributes.coordinate,
      Parameter: parameters,
    }
  })

  return dataWilayah
}
