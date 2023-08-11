import { GoogleAuth, Cloud } from "google-auth-library";
import { NextResponse } from "next/server";

// AUTH :https://stackoverflow.com/questions/74299271/linking-google-credentials-to-vercel

export async function POST(request) {
  // Call the function to make the request
  const url = "https://us-central1-lalit-1.cloudfunctions.net/ai-sidekick";

  const data = await request.json();

  const decodedBuffer = Buffer.from(
    process.env.NEXT_PUBLIC_BASE_64_CREDS,
    "base64"
  );
  const decodedJSON = JSON.parse(decodedBuffer.toString());
  const auth = new GoogleAuth({
    projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
    credentials: decodedJSON,
  });
  const client = await auth.getIdTokenClient(url);
  const response = await client.request({
    url,
    method: "POST",
    data: data,
  });

  if (response.status !== 200) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return NextResponse.json(
    {
      message: response.data,
    },
    {
      status: 200,
    }
  );
}
