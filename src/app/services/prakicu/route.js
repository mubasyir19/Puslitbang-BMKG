import { getPrakicu } from '@/services/dataBmkg'

export async function GET() {
  const response = await getPrakicu()
  return Response.json(response)
}
