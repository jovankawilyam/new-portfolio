import { NextRequest, NextResponse } from "next/server";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzPD6Dq8zWufaZlApPPqKQ-JZZ94AEnn5zG0EA8BKhgNZaYgXtuxz0oa5gmP-WL34aSvw/exec";
const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? DEFAULT_APPS_SCRIPT_URL;

async function forwardToAppsScript(request: NextRequest) {
  if (!APPS_SCRIPT_URL) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_APPS_SCRIPT_URL is not configured" },
      { status: 500 },
    );
  }

  const url = new URL(APPS_SCRIPT_URL);
  if (request.method === "GET") {
    url.searchParams.set("path", "comments");
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

  try {
    const upstreamResponse = await fetch(url.toString(), init);
    const responseContentType =
      upstreamResponse.headers.get("content-type") ?? "text/plain; charset=utf-8";
    const body = await upstreamResponse.arrayBuffer();

    return new NextResponse(body, {
      status: upstreamResponse.status,
      headers: {
        "content-type": responseContentType,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to connect to Apps Script: ${message}` },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return forwardToAppsScript(request);
}

export async function POST(request: NextRequest) {
  return forwardToAppsScript(request);
}
