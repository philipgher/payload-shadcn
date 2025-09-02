import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({
      revalidated: false,
      message: 'Invalid token'
    }, {
      status: 401,
    })
  }

  const { path } = await req.json().catch(() => { })

  if (!path) {
    return NextResponse.json({
      revalidated: false,
      message: 'No path provided'
    }, {
      status: 403
    })
  }

  revalidatePath(path)

  return NextResponse.json({
    revalidated: true,
    path,
  })
}