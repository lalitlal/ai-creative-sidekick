// Import the functions you need from the SDKs you need

import { getApps, initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
const decodedBuffer = Buffer.from(
  process.env.NEXT_PUBLIC_BASE_64_CREDS,
  "base64"
);
const decodedJSON = JSON.parse(decodedBuffer.toString());
export const firebase_app = initializeApp({
  credential: credential.cert(decodedJSON),
});
//   getApps().length === 0
//     ? initializeApp({ credential: credential.cert(decodedJSON) })
//     : getApps()[0];
export const db = getFirestore(firebase_app);
