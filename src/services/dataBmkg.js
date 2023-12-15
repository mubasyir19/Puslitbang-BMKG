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
    '.owl-kualitas-udara>div>div',
  )
  const results = []
  for (let i = 0; i < fetchData.length; i++) {
    const data = {
      kota: fetchData[i].children[1].getAttribute('id'),
      pm2: fetchData[i].children[0].children[1].textContent,
      status: fetchData[i].children[2].textContent,
    }
    results.push(data)
  }
  return results
}
