import { NextResponse } from "next/server"
import { getSinglePost } from "../../../../lib/notion"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const data = await getSinglePost(params.slug)
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(data)
}
