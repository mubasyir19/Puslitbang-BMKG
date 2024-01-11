import axios from 'axios'

export async function GET() {
  try {
    const fetchAutoGempa = await axios.get(
      'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
    )

    const autoGempa = fetchAutoGempa.data.Infogempa.gempa
    autoGempa.Shakemap = `https://data.bmkg.go.id/DataMKG/TEWS/${autoGempa.Shakemap}`

    return Response.json(autoGempa)
  } catch (err) {
    return Response.json({ message: err.message })
  }
}
