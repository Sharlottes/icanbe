import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { file, model } = await request.json();

  return NextResponse.json({});
}
