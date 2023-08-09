import { NextResponse } from "next/server";
import { GoogleAuth, Cloud } from "google-auth-library";
import { google } from "googleapis";
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export async function POST(request) {
  // Initialize storage
  const decodedBuffer = Buffer.from(
    process.env.NEXT_PUBLIC_BASE_64_CREDS,
    "base64"
  );
  const decodedJSON = JSON.parse(decodedBuffer.toString());

  const storage = new Storage({
    credentials: decodedJSON,
  });
  const data = await request.json();

  const bucketName = "creative-sidekick";
  const bucket = storage.bucket(bucketName);

  // GCS STUFF
  const blob = bucket.file(data.fileName);

  const stream = blob.createWriteStream({
    resumable: false,
    contentType: "text/csv", // Set the content type to CSV
  });
  // END GCS STUFF
  const fileContentStream = Readable.from(data.fileData);
  fileContentStream.pipe(stream);
  //   const arrayBuffer = await response.arrayBuffer();
  //   stream.end(arrayBuffer);
  console.log("File uploaded successfully.");

  return NextResponse.json(
    {
      message: "File uploaded successfully",
    },
    {
      status: 200,
    }
  );
}
