import { getPrakicu, getKUdara } from "@/services/dataBmkg"

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (query === 'prakicu') {
    const response = await getPrakicu()
    return Response.json(response)
  } else if (query === 'kudara') {
    const response = await getKUdara()
    return Response.json(response)
  } else {
    return Response.json('Hello world!')
  }
}