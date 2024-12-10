import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  const { text, voice } = await req.json();

  try {
    const output = await replicate.run(
      "elevenlabs/text-to-speech:c1b6dfc7c3e4e9a1fef4f6c7c5e9c98f2457f0f5b5e5e5e5e5e5e5e5e5e5e5",
      {
        input: {
          text: text,
          voice: voice,
        }
      }
    );

    return NextResponse.json({ audioUrl: output });
  } catch (error) {
    console.error('Error generating audio:', error);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}
