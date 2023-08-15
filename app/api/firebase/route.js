import { GoogleAuth } from "google-auth-library";
import { NextResponse } from "next/server";
import { db } from "./config";
// import { db } from "./config";

// AUTH :https://stackoverflow.com/questions/74299271/linking-google-credentials-to-vercel

export async function GET(request) {
  // Call the function to make the request
  const uuid = request.nextUrl.searchParams.get("uuid");

  const responseRef = db.collection("responses").doc(uuid);
  const doc = await responseRef.get();
  if (!doc.exists) {
    console.log("No such document!");
    return NextResponse.json(
      {
        message: "No data exists",
      },
      {
        status: 500,
      }
    );
  }
  const data = doc.data();
  //   console.log("Document data:", data);

  return NextResponse.json(
    {
      message: data.response,
    },
    {
      status: 200,
    }
  );
}
