const axios = require('axios')
const { JSDOM } = require('jsdom')

async function fetchElement(url, selector) {
  try {
    const response = await axios.get(url)
    const htmlContent = response.data

    const dom = new JSDOM(htmlContent)
    const document = dom.window.document
    const element = document.querySelectorAll(selector)

    return element
  } catch (error) {
    console.error('Error fetching or extracting data:', error.message)
  }
}

export async function getPrakicu() {
  const fetchData = await fetchElement(
    'https://bmkg.go.id',
    '.owl-prakicu-kota>div>div>div',
  )
  const results = []
  for (let i = 0; i < fetchData.length; i++) {
    const data = {
      kota: fetchData[i].children[0].textContent,
      waktu: fetchData[i].children[1].textContent,
      icon: `https://bmkg.go.id/${fetchData[i].children[2].getAttribute(
        'src',
      )}`,
      cuaca: fetchData[i].children[3].textContent,
      suhu: fetchData[i].children[4].textContent,
    }
    results.push(data)
  }
  return results
}

export async function getKUdara() {
  const fetchData = await fetchElement(
    'https://bmkg.go.id',
    'script[type="text/javascript"]',
  )

  const element = fetchData[10].innerHTML
  let out = false
  const a = []
  let ai = 0

  element.split('\n').map((el) => {
    let e = el.replace(/\s/g, '').split(',')[0]
    if (e === '})' && out === true) {
      out = false
      ai += 1
    }
    if (out) {
      a[ai].push(e.replace(/'/g, ''))
    }
    if (e === 'Circles.create({') {
      a.push([])
      out = true
    }
  })

  const getStatus = (v) => {
    if (v <= 15.5) return 'Baik'
    else if (v <= 55.4) return 'Sedang'
    else if (v <= 150.4) return 'Tidak Sehat'
    else if (v <= 250.4) return 'Sangat Tidak Sehat'
    else return 'Berbahaya'
  }

  const results = a.map((e) => {
    const value = parseFloat(e[4].split(':')[1])
    return {
      kota: e[0].split(':')[1],
      value: value,
      status: getStatus(value),
    }
  })

  return results
}
