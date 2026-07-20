import { NextRequest, NextResponse } from "next/server";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzG832_V9DsYbn_T31DRkncqQ8QF8g7KUesF991mRWepWAOitT3zvDP_ZXkuDT0O2j61g/exec";
const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? DEFAULT_APPS_SCRIPT_URL;

async function forwardToAppsScript(request: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_APPS_SCRIPT_URL is not configured" },
      { status: 500 },
    );
  }

  const headers = new Headers();
  const contentType = request.headers.get("content-type");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const upstreamResponse = await fetch(APPS_SCRIPT_URL, init);
  const responseContentType =
    upstreamResponse.headers.get("content-type") ?? "text/plain; charset=utf-8";
  const body = await upstreamResponse.arrayBuffer();

  return new NextResponse(body, {
    status: upstreamResponse.status,
    headers: {
      "content-type": responseContentType,
    },
  });
}

export async function GET(request: NextRequest) {
  return forwardToAppsScript(request);
}

export async function POST(request: NextRequest) {
  return forwardToAppsScript(request);
}
