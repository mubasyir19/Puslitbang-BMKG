import { getKUdara } from '@/services/dataBmkg'

export async function GET() {
  const response = await getKUdara()
  return Response.json(response)
}
