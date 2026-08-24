import { NextRequest, NextResponse } from "next/server";
import * as googleTTS from "google-tts-api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const lang = searchParams.get("lang") || "en";

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  try {
    // We expect the frontend to pass chunks of < 200 characters
    const url = googleTTS.getAudioUrl(text, {
      lang: lang,
      slow: false,
      host: "https://translate.google.com",
    });

    // Proxy the audio stream to bypass browser CORS and CORB restrictions
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google TTS fetch failed with status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000", // Cache audio for a year
      },
    });

  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: "Failed to generate TTS" }, { status: 500 });
  }
}
